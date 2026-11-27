/**
 * Mirrors the Etch changelog (https://account.etchwp.com/changelog/) into docs/changelog.md.
 *
 * The changelog site is the source of truth. Every release section of the page is rewritten
 * from its REST API; the front matter and intro above the first release are left untouched.
 *
 * Usage, from docs/: node scripts/sync-etch-changelog.js
 */
const fs = require('fs');
const path = require('path');

const API = 'https://account.etchwp.com/wp-json/wp/v2/changelog';
const PAGE = path.join(__dirname, '..', 'docs', 'changelog.md');

const DEFAULT_HEAD = `---
title: Changelog
sidebar_position: 403
---

# Changelog

Every Etch release, newest first.
`;

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

const BADGES = {
	new: 'New',
	improved: 'Improved',
	fixed: 'Fixed',
	breaking: 'Breaking'
};

// The type words releases prefix their items with, and the labels older releases stored per item.
const TYPE_WORDS = {
	new: 'new',
	feature: 'new',
	fix: 'fixed',
	fixed: 'fixed',
	improve: 'improved',
	improved: 'improved',
	improvement: 'improved',
	enhancement: 'improved',
	breaking: 'breaking'
};

const ENTITIES = {
	amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
	hellip: '…', ndash: '–', mdash: '—',
	lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”'
};

function decodeEntities(text) {
	return text
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
		.replace(/ /g, ' ');
}

/** Escapes text for MDX. Backtick code spans already in the text are kept verbatim. */
function escapeText(text) {
	return text
		.split(/(`[^`\n]+`)/)
		.map((part, index) =>
			index % 2
				? part
				: part
						.replace(/\\/g, '\\\\')
						.replace(/&/g, '&amp;')
						.replace(/[{}<*~]/g, '\\$&')
						.replace(/(^|[^A-Za-z0-9])_|_(?![A-Za-z0-9])/g, (match) => match.replace('_', '\\_'))
		)
		.join('');
}

function codeSpan(code) {
	const fence = code.includes('`') ? '``' : '`';
	const pad = code.startsWith('`') || code.endsWith('`') ? ' ' : '';
	return fence + pad + code + pad + fence;
}

// Docs pages that moved since a release linked to them.
const MOVED_DOCS = {
	'/troubleshooting/api-concurrency-limit': '/troubleshooting/performance-issues',
	'/components/prop-slot': '/components/slots',
	'/components/props/prop-array': '/components/props/prop-loop'
};

/** Links into these docs become site-relative, so the build checks them. The old docs host no longer resolves. */
function docsLink(href) {
	const match = /^https?:\/\/docs\.(?:account\.)?etchwp\.com(\/[^#?]*)?(.*)$/i.exec(href);
	if (!match) return href;
	const page = (match[1] || '/').replace(/(.)\/$/, '$1');
	return (MOVED_DOCS[page] || page) + match[2];
}

/** Parses the small HTML subset the changelog uses into a tree. */
function parseHtml(html) {
	const root = { tag: 'root', children: [] };
	const stack = [root];
	const pattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|[^<]+|</g;
	let match;
	while ((match = pattern.exec(html))) {
		const [token, closing, rawTag, attrs] = match;
		const top = stack[stack.length - 1];
		if (!rawTag) {
			if (!token.startsWith('<!--')) top.children.push({ text: token });
			continue;
		}
		const tag = rawTag.toLowerCase();
		if (closing) {
			const open = stack.map((node) => node.tag).lastIndexOf(tag);
			if (open > 0) stack.length = open;
		} else if (tag === 'br') {
			top.children.push({ tag, children: [] });
		} else {
			const href = /href\s*=\s*"([^"]*)"/i.exec(attrs);
			const node = { tag, children: [], href: href ? docsLink(decodeEntities(href[1])) : null };
			top.children.push(node);
			stack.push(node);
		}
	}
	return root;
}

const BLOCK_TAGS = new Set(['p', 'ul', 'ol', 'li', 'div']);

function plainText(node) {
	if (node.text !== undefined) return decodeEntities(node.text);
	return node.children.map(plainText).join('');
}

function wrap(marker, inner) {
	const text = inner.trim();
	if (!text) return inner;
	const lead = /^\s/.test(inner) ? ' ' : '';
	const trail = /\s$/.test(inner) ? ' ' : '';
	return lead + marker + text + marker + trail;
}

function renderInline(nodes) {
	return nodes
		.map((node) => {
			if (node.text !== undefined) return escapeText(decodeEntities(node.text));
			switch (node.tag) {
				case 'br':
					return '\n';
				case 'code':
					return codeSpan(plainText(node).trim());
				case 'strong':
				case 'b':
					return wrap('**', renderInline(node.children));
				case 'em':
				case 'i':
					return wrap('*', renderInline(node.children));
				case 'a': {
					const label = renderInline(node.children).trim();
					return node.href ? `[${label || escapeText(node.href)}](${node.href})` : label;
				}
				default:
					return renderInline(node.children);
			}
		})
		.join('');
}

function tidy(markdown) {
	return markdown.replace(/\s+/g, ' ').trim();
}

/** Renders nodes to Markdown blocks: paragraphs and (nested) bullet lists. */
function renderBlocks(nodes) {
	const blocks = [];
	let inline = [];
	const flush = () => {
		// Plain-text fields mark paragraphs with blank lines instead of <p>.
		for (const part of renderInline(inline).split(/\n\s*\n/)) {
			if (tidy(part)) blocks.push(tidy(part));
		}
		inline = [];
	};
	for (const node of nodes) {
		if (node.text !== undefined || !BLOCK_TAGS.has(node.tag)) {
			inline.push(node);
			continue;
		}
		flush();
		if (node.tag === 'ul' || node.tag === 'ol') {
			const items = node.children
				.filter((child) => child.tag === 'li')
				.map((item) => '- ' + indent(renderBlocks(item.children).join('\n\n')).trimStart());
			if (items.length) blocks.push(items.join('\n'));
		} else {
			blocks.push(...renderBlocks(node.children));
		}
	}
	flush();
	return blocks;
}

function indent(markdown) {
	return markdown
		.split('\n')
		.map((line) => (line ? '  ' + line : line))
		.join('\n');
}

/**
 * Splits "New: …", "**Fix:** …" or "Improve (Editor): …" into a type and the remaining text.
 * A scope in brackets is kept as a prefix: "Editor: …".
 */
function splitType(markdown) {
	const match = /^(\*\*)?\s*([A-Za-z]+)\s*(?:\(([^)]+)\))?\s*:?\s*(?:\*\*)?\s*:?\s*/.exec(markdown);
	if (!match || !/:/.test(match[0])) return { type: null, text: markdown };
	const type = TYPE_WORDS[match[2].toLowerCase()];
	if (!type) return { type: null, text: markdown };
	const rest = markdown.slice(match[0].length);
	return { type, text: match[3] ? `${match[3]}: ${rest}` : rest };
}

function releaseItems(acf) {
	const rows = acf.changelog_row || [];
	if (rows.length) {
		return rows.map((row) => {
			const title = splitType(tidy(escapeText(decodeEntities(row.changelog_item || ''))));
			return {
				type: TYPE_WORDS[(row.changelog_item_status || '').toLowerCase()] || title.type,
				text: title.text,
				description: renderBlocks(parseHtml(row.changelog_item_description || '').children)
			};
		});
	}
	const list = parseHtml(acf.changelog_list || '').children.find((node) => node.tag === 'ul');
	if (!list) return [];
	return list.children
		.filter((node) => node.tag === 'li')
		.map((item) => {
			const [first = '', ...description] = renderBlocks(item.children);
			return { ...splitType(first), description };
		});
}

function renderRelease(release) {
	const title = decodeEntities(release.title.rendered).trim();
	const [year, month, day] = release.date.slice(0, 10).split('-').map(Number);
	const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	const lines = [`## ${escapeText(title)} · ${MONTHS[month - 1]} ${day}, ${year} {#${anchor}}`];

	const items = releaseItems(release.acf || {}).map((item) => {
		const badge = item.type
			? `<span className="badge changelog-badge changelog-badge--${item.type}">${BADGES[item.type]}</span> `
			: '';
		return [`- ${badge}${item.text}`, ...item.description.map(indent)].join('\n\n');
	});
	if (items.length) lines.push(items.join('\n\n'));

	const notes = renderBlocks(parseHtml(release.content.rendered || '').children).join('\n\n');
	if (notes && items.length) {
		lines.push(`<details>\n<summary>Release notes</summary>\n\n${notes}\n\n</details>`);
	} else if (notes) {
		lines.push(notes);
	}
	return { title, anchor, markdown: lines.join('\n\n') };
}

async function fetchReleases() {
	const releases = [];
	for (let page = 1, pages = 1; page <= pages; page++) {
		const response = await fetch(
			`${API}?per_page=100&page=${page}&orderby=date&order=desc&_fields=id,date,slug,title,content,acf`,
			{ headers: { 'User-Agent': 'docs-changelog-sync' } }
		);
		if (!response.ok) throw new Error(`${response.url} answered ${response.status}`);
		pages = Number(response.headers.get('x-wp-totalpages')) || 1;
		releases.push(...(await response.json()));
	}
	return releases.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
}

function existingSections(page) {
	const sections = new Map();
	for (const section of page.split(/^(?=## )/m).slice(1)) {
		const anchor = /\{#([^}]+)\}/.exec(section.split('\n')[0]);
		if (anchor) sections.set(anchor[1], section.trim());
	}
	return sections;
}

async function main() {
	const releases = (await fetchReleases()).map(renderRelease);
	if (!releases.length) throw new Error('The changelog API returned no releases.');

	const duplicate = releases.find((release, index) => releases.findIndex((other) => other.anchor === release.anchor) !== index);
	if (duplicate) throw new Error(`Two releases share the anchor #${duplicate.anchor}.`);

	const current = fs.existsSync(PAGE) ? fs.readFileSync(PAGE, 'utf8') : DEFAULT_HEAD;
	const firstRelease = current.search(/^## /m);
	const head = (firstRelease === -1 ? current : current.slice(0, firstRelease)).trimEnd();
	const before = existingSections(current);

	fs.writeFileSync(PAGE, [head, ...releases.map((release) => release.markdown)].join('\n\n') + '\n');

	const added = releases.filter((release) => !before.has(release.anchor));
	const changed = releases.filter((release) => before.has(release.anchor) && before.get(release.anchor) !== release.markdown);
	const removed = [...before.keys()].filter((anchor) => !releases.some((release) => release.anchor === anchor));
	const names = (list) => list.map((release) => release.title).join(', ');

	console.log(`${releases.length} releases written to ${path.relative(process.cwd(), PAGE)}`);
	if (added.length) console.log(`Added (${added.length}): ${names(added)}`);
	if (changed.length) console.log(`Changed (${changed.length}): ${names(changed)}`);
	if (removed.length) console.log(`Removed (${removed.length}): ${removed.join(', ')}`);
	if (!added.length && !changed.length && !removed.length) console.log('No changes');
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
