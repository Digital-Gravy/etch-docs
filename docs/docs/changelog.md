---
title: Changelog
sidebar_position: 403
---

# Changelog

Every Etch release, newest first.

## 1.8.3 · November 13, 2026 {#1-8-3}

- <span className="badge changelog-badge changelog-badge--new">New</span> Slim SEO and Slim SEO Pro now read rendered Etch content for meta descriptions, schema, content analysis, link tools, and image sitemaps.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Clicking a block on the canvas no longer scrolls the canvas unexpectedly.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Older URL and color properties are now editable as text again.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> JPEGs now keep their correct EXIF orientation when Etch compresses them.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Component instances now highlight on hover in the builder.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Toast countdowns now pause unless the builder has focus.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Text button icons now stay inline instead of wrapping out of place.

<details>
<summary>Release notes</summary>

This release adds first-class Slim SEO and Slim SEO Pro support for Etch content, so rendered blocks now feed descriptions, schema, content analysis, link tools, and sitemap images correctly.

It also fixes several builder and media edge cases, including unwanted canvas scrolling, legacy property editing, component hover feedback, toast timing, button icon layout, and JPEG orientation during compression.

</details>

## 1.8.2 · November 10, 2026 {#1-8-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Structure rendering now supports an opt-in `lazy-once` mode.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Generated excerpts now preserve whitespace between adjacent elements, so words no longer run together.

<details>
<summary>Release notes</summary>

This small patch release fixes an issue introduced with SEOPress support where auto-generated meta descriptions and excerpts joined text from adjacent elements without spaces.

It also introduces a new experimental performance setting: previously, opening the builder on large pages could cause a brief freeze because the Structure tree rendered every single nested element upfront—even collapsed ones. The new Lazy Structure Tree setting renders nested rows only when first expanded, keeping startup fast while preserving smooth drag-and-drop once opened.

- **Fix:** Auto-generated excerpts and SEOPress meta descriptions now preserve whitespace between adjacent elements, preventing words from running together on pages without a manual description.
- **New:** **Lazy Structure Tree** in *Settings → Experimental* reduces builder startup freezes by loading nested rows in the Structure tree only when their parent element is first expanded.

</details>

## 1.8.1 · November 10, 2026 {#1-8-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> SEOPress now analyzes rendered Etch content and uses it for excerpts plus image and video sitemaps, so Etch-built pages report real words, headings, descriptions, and media.

<details>
<summary>Release notes</summary>

This small release adds first-class SEOPress support for Etch-built content. SEOPress now reads the rendered output of your Etch pages instead of raw block comments, which improves analysis and helps its sitemap and description features pick up the real page content.

</details>

## 1.8.0 · November 6, 2026 {#1-8-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Connector can now browse Media Library items through the public `etch.assets` API, with metadata plus MIME type and nested collection filters.

- <span className="badge changelog-badge changelog-badge--new">New</span> Connector can now upload files to the Media Library and download existing media through the public `etch.assets` API.

- <span className="badge changelog-badge changelog-badge--new">New</span> Connector can now create, rename, move, and delete asset collections, and add or remove media from them, through the public `etch.assets` API.

- <span className="badge changelog-badge changelog-badge--new">New</span> Connector can now delete media items and update their alt text through the public `etch.assets` API.

- <span className="badge changelog-badge changelog-badge--new">New</span> Supported images can now be compressed in place through the public `etch.assets` API.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Existing Etch blocks already saved in a post no longer get stripped when a multisite editor without `unfiltered_html` updates the post.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Etch now sanitizes dynamic data, shortcodes, attachment content, and block attributes more consistently to block `javascript:` URLs and injected `<script>` tags for users without `unfiltered_html`.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Clicking a component that contains nested components now selects the page-level component and opens its Properties panel.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Canvas outlines now stay on a single block instead of highlighting multiple blocks at once.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Clicking a link now keeps its editing session open on the first click.

<details>
<summary>Release notes</summary>

This release makes saving posts safer and gives you more ways to manage your Media Library through the Etch Connector. When you edit a post without the unfiltered_html permission, Etch better preserves existing blocks while filtering unsafe URLs, scripts, and block content.

You can now use the Etch Connector to browse, upload, download, organize, and compress Media Library images. We’ve also fixed canvas issues with nested component selection,

block outlines, and link editing.

</details>

## 1.7.1 · October 19, 2026 {#1-7-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Builder no longer triggers a Basic Auth login prompt on load or refresh for sites that restrict anonymous WordPress REST API access.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Newly created classes and other style changes now apply in the canvas immediately instead of requiring a reload.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> `components.updateAsync()` now accepts authoring JSON and correctly links styles from classes in `attributes.class`.

<details>
<summary>Release notes</summary>

This is a small bugfix release that focuses on builder reliability. The builder no longer trips Basic Auth prompts on locked-down WordPress installs, canvas styles update reliably again, and `components.updateAsync()` (publicAPI / etch connector) handles authoring JSON more reliably.

</details>

## 1.7.0 · October 8, 2026 {#1-7-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Yoast SEO and Rank Math now analyze rendered Etch content in the WordPress block editor, including dynamic content.

- <span className="badge changelog-badge changelog-badge--new">New</span> Word counts and focus keyphrase checks now account for the text your Etch blocks output.

- <span className="badge changelog-badge changelog-badge--new">New</span> SEO analysis now detects images and alt text rendered by Etch blocks.

- <span className="badge changelog-badge changelog-badge--new">New</span> Content analysis updates as you edit, without manually copying your Etch content into another field.

- <span className="badge changelog-badge changelog-badge--new">New</span> Yoast SEO and Rank Math image sitemaps now include images rendered by Etch blocks, with dynamic image sources resolved for each indexed post.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Yoast’s image URL and image-data filters are respected, keeping existing sitemap customizations working.

<details>
<summary>Release notes</summary>

Etch 1.7.0: Yoast SEO and Rank Math compatibility is here!

You can now optimize your Etch content with two of WordPress’s most popular SEO plugins. Etch gives Yoast SEO and Rank Math the rendered HTML behind your blocks, so their content analysis can see what you’re actually building.

</details>

## 1.6.8 · October 2, 2026 {#1-6-8}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic data now includes `isTruthy` and `isFalsy` modifiers.

- <span className="badge changelog-badge changelog-badge--new">New</span> Typing `tr;` now expands to `to-rem`.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Builder performance is much faster on large pages, especially when loading the canvas, selecting blocks, and duplicating sections.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Editors now use updated double-click selection behavior.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Media Library SVGs no longer trigger PHP warnings in dynamic image blocks.

<details>
<summary>Release notes</summary>

This release focuses mostly on builder responsiveness. Etch feels faster on larger pages, particularly when the canvas loads, when you select blocks, and when you duplicate sections.

It also adds two small editor conveniences and fixes PHP warnings when dynamic image blocks render SVGs from the Media Library.

</details>

## 1.6.7 · September 3, 2026 {#1-6-7}

- <span className="badge changelog-badge changelog-badge--new">New</span> The public API now exposes `etch.environment` so integrations can adapt to the current environment.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Activating the AI bridge now copies the connector command to your clipboard.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Textarea custom fields now preserve line breaks when you save a post from the WordPress post editor.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Cross-site paste now remaps component class properties more reliably when the destination already has a component with the same key, and unresolved class IDs show a warning instead of appearing as a raw class name.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Switch fields in the WordPress metabox now correctly handle a saved `0` value.

<details>
<summary>Release notes</summary>

This release focuses on data safety and content portability. Textarea custom fields no longer lose line breaks when you save a post from the WordPress post editor, and cross-site paste handles component class properties more reliably.

It also includes a few smaller workflow improvements: switch fields handle `0` values correctly, AI bridge activation saves a step by copying the connector command for you, and the public API now exposes environment information for integrations.

</details>

## 1.6.6 · August 24, 2026 {#1-6-6}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The `toSlug` modifier no longer crashes pages on hosts where the PHP `intl` extension is not installed.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> When you edit a component instance, the builder now scrolls to the correct instance instead of jumping to the first matching component.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The unsaved changes warning now appears more reliably.

<details>
<summary>Release notes</summary>

This is a small maintenance release focused on builder reliability. It fixes a fatal `toSlug` crash on hosts without the PHP `intl` extension, corrects component editing so the builder scrolls to the instance you selected, and makes the unsaved changes warning more dependable.

</details>

## 1.6.5 · August 10, 2026 {#1-6-5}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Term loops, the loop manager, and Content Hub now handle very large taxonomies reliably instead of slowing down or failing with errors.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> SVG uploads now complete reliably instead of getting stuck when a PHP warning interrupts the upload response.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Metabox fields stored in custom tables no longer show a warning when they return a single-value array.

<details>
<summary>Release notes</summary>

This is a small stability release focused on reliability in a few high-friction areas. Etch now handles very large taxonomies more reliably in term loops and Content Hub, and it also fixes SVG upload issues and a metabox warning edge case.

</details>

## 1.6.4 · July 29, 2026 {#1-6-4}

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom fields now support an image type.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Asset manager now uses `srcset` so image previews stay sharp and preserve their original aspect ratios in the masonry grid.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Asset manager now loads more reliably and avoids showing duplicate media items while you browse.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Bulk uploads now keep every file in the selected collection instead of silently sending some files to Uncategorized.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dragging images inside the asset grid no longer creates duplicate images in the grid.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loop blocks now fall back to the loop's default URL when the `url` parameter is missing instead of outputting an unresolved value.

<details>
<summary>Release notes</summary>

This release focuses on the asset manager. It fixes loading problems, bulk upload collection assignment, duplicate images, and blurry previews so working with larger media libraries is more reliable.

It also adds image support for custom fields and fixes a loop URL fallback edge case.

</details>

## 1.6.3 · July 20, 2026 {#1-6-3}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Templates panel no longer crashes when multiple post types or taxonomies share the same label.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> CSS mini GUI icons now correctly show when styles such as grid are already active.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Added the `ENABLE_METABOX_LEGACY_MODE` feature flag to improve Meta Box file field data retrieval. The flag is enabled by default to preserve backward compatibility.

<details>
<summary>Release notes</summary>

This is a small maintenance release focused on builder stability, UI feedback, and Meta Box compatibility. The Templates panel no longer crashes on WordPress sites where multiple post types or taxonomies share the same label, the CSS mini GUI once again shows which styles are active, and a new feature flag has been introduced to preserve legacy Meta Box file field behavior while improving data retrieval.

</details>

## 1.6.2 · July 8, 2026 {#1-6-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Intelligence can now update existing loop definitions, including patching names and query arguments without overwriting untouched settings.

- <span className="badge changelog-badge changelog-badge--new">New</span> Terms in Content Hub now support inline editing, including selecting a parent term.

- <span className="badge changelog-badge changelog-badge--new">New</span> Taxonomies in Content Hub now support inline editing.

- <span className="badge changelog-badge changelog-badge--new">New</span> Taxonomies in Content Hub now include a settings dialog so you can edit an existing taxonomy from the list or context menu.

- <span className="badge changelog-badge changelog-badge--new">New</span> Asset Manager collections now support nesting — organize collections into parent/child groups up to two levels deep, with drag-and-drop reordering across nesting levels.

- <span className="badge changelog-badge changelog-badge--new">New</span> Asset Manager now supports compression presets — save, edit, and reuse your compression settings, with the last-used preset auto-applied on load.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Etch Intelligence can now complete longer multi-step tasks before hitting its tool-use limit.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Asset Manager drag-and-drop gives better visual feedback when dragging items into collections, and prevents the browser from opening files in new tabs on missed drops.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Content Hub no longer shows an unsaved changes prompt when you switch between posts or pages, which reduces the risk of accidental data loss.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loops in the builder now render items with falsy values like `0`, `false`, and empty strings instead of skipping them.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Asset Manager now rolls back optimistic UI changes when the server rejects an operation, preventing UI/server divergence until page reload.

<details>
<summary>Release notes</summary>

This release focuses on Content Hub editing and Etch Intelligence workflow improvements. You can now edit terms and taxonomies more directly in Content Hub, and Etch Intelligence can update existing loop definitions instead of only helping you inspect them.

It also brings significant Asset Manager improvements: nested collections, compression presets, and better drag-and-drop — along with fixes for several high-impact workflow issues.

</details>

## 1.6.1 · July 2, 2026 {#1-6-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant permissions now let you allow or block actions by domain, with clearer labels in the toggles UI.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now update existing posts in Build mode, including title-only or content-only changes.

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub now lets you delete taxonomies from both the list view and the right-click menu.

- <span className="badge changelog-badge changelog-badge--new">New</span> Uncategorized section for assets that aren't assigned to a collection.

- <span className="badge changelog-badge changelog-badge--new">New</span> Proper upload feedback while collections upload in the asset manager.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Delete confirmation dialogs now appear before destructive actions, so you can cancel accidental deletions.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Assets now upload to the currently selected collection

<details>
<summary>Release notes</summary>

This release makes destructive actions safer and expands AI Assistant controls. Etch now asks for confirmation before deletions, and Content Hub adds taxonomy deletion. It also ships with a first round of improvements for the new asset manager.

AI Assistant also gains more practical editing support: you can control which actions it’s allowed to take, and it can now update existing posts in Build mode.

</details>

## 1.6.0 · July 1, 2026 {#1-6-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch-Native Asset Manager (Replaces WordPress Media Library in the Builder)

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub now lets you create taxonomies and automatically opens the new taxonomy after saving.

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub now lets you delete taxonomies.

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub now lets you delete individual terms from a taxonomy.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now list the stylesheets available on your site.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Presence Overlay (For AI Harnesses connected via the Etch-Connector).

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Settings dialog now includes a toggle for Asset Manager.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Component content no longer becomes unclickable after you exit the component editor without saving.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Structure panel no longer grows or shows incorrect hover states when a toast notification appears.

<details>
<summary>Release notes</summary>

This release adds the new Asset Manager and expands Content Hub taxonomy management. You can now create taxonomies, delete taxonomies, and remove individual terms directly in Etch instead of jumping out to other admin screens.

If you run into any issues, or something you need is missing with the Asset Manager, you can use the toggle in the settings to go back to the native WordPress Media Library. Please report any issues you find.

It also adds a new “AI Presence Overlay” that AI Harnesses can activate via the public API to indicate when they are working/thinking, etc., and adds some capabilities for the AI Assistant.

The release also fixes a couple of builder UI issues, including unclickable component content after exiting the component editor without saving.

</details>

## 1.5.4 · June 26, 2026 {#1-5-4}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now inspect your project's components, including listing available components and reading a specific component's structure.

- <span className="badge changelog-badge changelog-badge--new">New</span> The public API now supports copying and pasting blocks.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> `blocks.create()` now accepts `null` to insert new blocks at the document root.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The public API now throws a clear error when you create, move, or paste a block into a disallowed location.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Content Hub now shows private Etch post types with special characters in the slug and no longer mixes in non-Etch post types that share a REST base.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> "Launch Etch" now works when WordPress is installed in a subdirectory.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Term Loop no longer shows an incorrect error when `hide_empty` is `true`.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Builder scrollbars now render more consistently across browsers and no longer leave an invisible strip along the right edge.

<details>
<summary>Release notes</summary>

This release expands what agency developers can do through AI Assistant and the public API, while fixing a set of Builder and Content Hub issues around post type visibility, subdirectory WordPress installs, Term Loop errors, and scrollbar behavior.

</details>

## 1.5.3 · June 24, 2026 {#1-5-3}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Custom post types now enable Featured Image support by default.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Custom post types now show a Parent selector when you enable the hierarchical toggle.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Custom post types now sanitize slugs and `rest_base` values consistently, and post types with invalid slug characters can be updated or deleted from Content Hub.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Component instances no longer make the builder unresponsive when a select prop contains duplicate values. (Only the first value is used)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loop selection dropdowns now render above the Elements bar so every loop stays visible and selectable.

<details>
<summary>Release notes</summary>

This is a small release focused on builder stability and bug fixes. We fixed several custom post type edge cases around slug handling, select options, and Content Hub management.

We also fixed two UI issues: duplicate values in component select props get deduplicated (duplicate values made the builder unresponsive), and long loop dropdowns remain fully visible above the Elements bar.

</details>

## 1.5.2 · June 19, 2026 {#1-5-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub now includes a Taxonomies section where you can browse taxonomies and view their terms.

- <span className="badge changelog-badge changelog-badge--new">New</span> You can now create new terms directly inside a selected taxonomy in Content Hub, inline editing coming soon.

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom Field Groups now support Checkbox, Radio and Select fields.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now inspect the current page structure, look up individual blocks, and search for matching blocks.

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic data now includes `htmlEncode` and `htmlDecode` modifiers for converting HTML entities in strings.

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom post types now include a `with front` control so you can remove a slug base such as `/blog/` from their permalinks.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch's public API can now set and remove component props through block attributes.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The builder context menu now folds Create into Convert to to simplify block conversion actions.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Content Hub now lists non-public Etch custom post types, removes the duplicate custom field group button, and uses the same date format for Last edited as for Created.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The `to-rem` modifier now converts negative values instead of dropping them.

<details>
<summary>Release notes</summary>

This release ships our official [AI Connector](https://www.npmjs.com/package/@digital-gravy/etch-connector). It’s still experimental. Follow the link for install instructions, then turn the feature on in the Etch settings panel. Video demo coming on Monday.

The release also expands Content Hub with taxonomy management and broader custom field support. You can browse taxonomies and terms, create new terms in place, and use new Checkbox, Radio and Select field types.

It also adds a few builder and AI Assistant improvements. AI Assistant can inspect the current page structure more directly, dynamic data gains `htmlEncode` and `htmlDecode`, and several fixes clean up Content Hub and value conversion.

</details>

## 1.5.1 · June 12, 2026 {#1-5-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The builder no longer mounts twice after updating to 1.5.0

<details>
<summary>Release notes</summary>

This patch release fixes the 1.5.0 regression that could mount the builder twice on production sites after updating. Etch now ensure that the builder is only initialized once, so the editor no longer appears duplicated on the page.

</details>

## 1.5.0 · June 11, 2026 {#1-5-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now read, set, and update custom field values on a post.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now search for posts across your post types.

- <span className="badge changelog-badge changelog-badge--new">New</span> Multi-select (MVP) -- Currently you can bulk delete or bulk assign elements to AI context. This will be expanded to other actions in the future.

- <span className="badge changelog-badge changelog-badge--new">New</span> Public scripting API on window.etch for programmatic control.

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom field type Date, accepting calendar-valid YYYY-MM-DD values.

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom field type Time, accepting clock-valid HH:MM:SS values.

- <span className="badge changelog-badge changelog-badge--new">New</span> Delete Custom Post Types, Custom Field Groups, and Custom Fields directly from a right-click context menu.

- <span className="badge changelog-badge changelog-badge--new">New</span> Edit Custom Field Group settings from a context menu.

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom Field Groups can be assigned with an exclusion rule (is not in) for post types.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI chat now lets you scroll up to pause auto-scroll, and resumes when you return to the bottom.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant now opens new conversations in Build mode by default.

- <span className="badge changelog-badge changelog-badge--new">New</span> The Loops panel now shows each loop's type.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Undo/redo buttons in the action bar stay stable for more reliable history navigation.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The AI readiness check no longer runs when AI Assistant is disabled.

<details>
<summary>Release notes</summary>

Etch 1.5.0 is finally here, and it’s a big one! We’re shipping the new Public API, which lets you drive blocks, styles, components, loops, and more programmatically. AI Assistant now supports ACSS, reads and writes custom field values, and can search your content across post types. And the Content Hub introduces new Date and Time field types, right-click management for custom fields and groups, and exclusion-based assignment rules.

Public API docs: [https://docs.account.etchwp.com/public-api](/public-api)

</details>

## 1.4.20 · June 1, 2026 {#1-4-20}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now create custom field groups.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now create and update custom fields inside an existing custom field group.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now list custom field groups.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now read `.xlsx` files from the Media Library.

- <span className="badge changelog-badge changelog-badge--new">New</span> WooCommerce product loop data now includes `gallery_images`, with the featured image first followed by the rest of the product gallery.

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic data now supports [arithmetic modifiers](/dynamic-data/dynamic-data-modifiers/arithmetic-modifiers): `add`, `subtract`, `multiply`, `divide`, and `mod`.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Editing a page’s slug or excerpt in Content Hub no longer clears the page content.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Possibility to [limit concurrent API requests](/troubleshooting/performance-issues) with the `ETCH_API_CONCURRENCY_LIMIT` PHP constant.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loop blocks that target component props now resolve correctly in the builder.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> AI Assistant now validates dropped file sizes to prevent crashes from oversized uploads.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Taxonomy loop data now resolves the correct MetaBox fields when multiple MetaBox groups are assigned to different taxonomies.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> On WordPress 7+, Etch no longer outputs the extra WordPress site wrapper and skip link markup around your content.

<details>
<summary>Release notes</summary>

This release expands what AI Assistant and dynamic data can do.

AI Assistant can now work with custom fields (creating groups and fields), and can read .xlsx files from the Media Library. WooCommerce product loops expose gallery_images, and dynamic data picks up arithmetic modifiers. Plus a handful of stability fixes.

</details>

## 1.4.19 · May 21, 2026 {#1-4-19}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant now accepts pasted and dropped files in chat.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now read CSV files from the Media Library and describe their contents, including when you want to use that data to create posts.

- <span className="badge changelog-badge changelog-badge--new">New</span> The builder controls API now exposes an `onSave` hook so custom integrations can run code after a save completes.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The `concat` dynamic-data modifier now works with arrays, so you can merge arrays and append values instead of only concatenating strings.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Duplicate slots used across conditional branches now save correctly in Gutenberg instead of losing or corrupting content.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Raw HTML now sanitizes more consistently between the builder and the frontend, reducing cases where content renders differently after publish.

<details>
<summary>Release notes</summary>

This release focuses on giving the AI Assistant the ability to handle files and bug fixes. Duplicate slots inside conditional branches now save correctly in Gutenberg, and the AI Assistant can now work with files including CSVs.

It also adds an onSave hook for 3rd party developers and better aligns the sanitization of raw HTML between the frontend and the builder.

</details>

## 1.4.18 · May 12, 2026 {#1-4-18}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now write post content (paragraphs, headings, lists supported initially).

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now find media items from your media library.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI Assistant can now set a featured image when creating posts.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> AI Assistant tool calls now appear in chat.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Image preview in dynamic image properties now updates when switching between elements.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Components nested in slots now display their content preview instead of raw `{props.x}` placeholders.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Data comparison modifiers (equal, less, greater, etc.) now correctly handle null values.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> AI Assistant chat no longer drops streamed content under certain timing conditions.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Newly AI-created custom post types are now properly visible in Content Hub.

<details>
<summary>Release notes</summary>

Etch 1.4.18 expands the AI Assistant’s content-creation toolkit: it can now write post content, find media from your library, set featured images, and surface its tool calls in chat. Plus builder fixes for image previews, components nested in slots, and data comparison modifiers.

</details>

## 1.4.17 · May 5, 2026 {#1-4-17}

- <span className="badge changelog-badge changelog-badge--new">New</span> Graceful recovery and clear error toast when the AI tries to call an unsupported capability

- <span className="badge changelog-badge changelog-badge--new">New</span> AI loop capability now creates loops for any post type, not just posts

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refined styling for AI chat code action buttons

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Component blocks with a condition property no longer break the Gutenberg editor

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Eliminated thousands of console "@property rule was ignored" errors that could trigger host firewalls

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Properties panel select dropdown no longer gets buried offscreen

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Strip colors button now works on plain SVGs

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> SVG media picker now works for dynamic (etch:svg) SVGs

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> list_post_types AI capability returns post type slugs, not REST bases

<details>
<summary>Release notes</summary>

Etch 1.4.17 fixes a 1.4.16 regression where condition properties broke the Gutenberg editor, clears the flood of `@property` console errors, and resolves several SVG and dropdown bugs. Also: AI loops now work for any post type, and the AI chat handles unsupported capability calls gracefully.

</details>

## 1.4.16 · April 30, 2026 {#1-4-16}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Boolean props use a standard toggle again instead of the cycling tri-state button — the toggle disables itself when the value is a dynamic reference

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Comboboxes keep reactivity after you type in them — external value updates are reflected back into the displayed value

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Some hosts' PHP output buffering causes the AI assistant's response to come back empty — enable [`ENABLE_CLEAR_BUFFER_IN_STREAM_REQUEST`](/feature-flags) if you're seeing this. [Reported here](https://community.account.etchwp.com/c/announcements/1-4-8#comment_wrapper_99876808).

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dynamic image placeholders now preserve classes and attributes set on the block, so they style consistently with the resolved image

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Select property options textarea now grows up to 10 lines (was capped at 3)

<details>
<summary>Release notes</summary>

A small fix release while we’re heads-down on 1.5.0’s big-ticket items — the third-party API and expanded AI capabilities. This release ships UI fixes (combobox reactivity, the boolean property toggle is back, dynamic image placeholders) and an opt-in flag for hosts where PHP output buffering was making AI responses come back empty.

</details>

## 1.4.15 · April 24, 2026 {#1-4-15}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic SVG elements now accept a WordPress attachment ID in the `src` attribute and resolve it to the attachment URL

- <span className="badge changelog-badge changelog-badge--new">New</span> Components expose a new `{component}` dynamic data scope — see the [component namespace docs](/components/component-namespace) for what's available

- <span className="badge changelog-badge changelog-badge--new">New</span> Detach a component instance from its component — breaks the link so the block becomes a regular set of elements you can edit freely

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refreshed properties panel — the component name and key now live in the panel header instead of taking up a row

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Condition properties nested inside another condition property now evaluate and render their children correctly

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Media ID properties are no longer silently rewritten to the attachment URL at resolve time

<details>
<summary>Release notes</summary>

Etch 1.4.15 fixes an issue with media ID props being silently rewritten to the attachment URL, and introduces support for conditions nested inside other conditions. It also includes the new \{component\} dynamic data scope, support for attachment IDs in dynamic SVG src, and the ability to detach a component instance.

</details>

## 1.4.14 · April 23, 2026 {#1-4-14}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI can list your post types — ask it "what post types do I have?" in either Ask or Build mode.

- <span className="badge changelog-badge changelog-badge--new">New</span> Add a description to component properties to document them for reuse.

- <span className="badge changelog-badge changelog-badge--new">New</span> Reorder items inside repeater property instances via drag-and-drop.

- <span className="badge changelog-badge changelog-badge--new">New</span> "Wrap in" options (div, loop, condition) in the right-click menu, with colorized actions.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Media, Class, Object, Select, Loop, Group, and Condition property inputs redesigned with a vertically-stacked layout.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Media prop keeps the image when switching between URL and Media ID modes.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Condition prop shows the expression under its label with an un-selectable `{if}` prefix; copy/paste no longer injects curly braces.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Class prop lets CSS classes wrap up to 3 lines before scrolling.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Select prop replaces the popover with an expandable textarea; shows "No options added" when empty.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Object prop popover is now wider (500px) for easier editing.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Group prop padding, spacing, and header styling refined.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Component editor misc polish — dropdown spacing, prop-value opacity, full-width class inputs.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> "Create Component" icon in the element settings panel is now solid and purple for better visibility.

<details>
<summary>Release notes</summary>

This release contains the last step of the component editor redesign: every property input now shares a consistent stacked layout, with prop descriptions and drag-to-reorder on repeaters. On the AI side, the assistant can now list your post types — the first step toward end-to-end loop creation (CPTs, posts, loops, insertion) landing in upcoming releases.

</details>

## 1.4.13 · April 20, 2026 {#1-4-13}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> New boolean prop switch and refined styling for select, loop, and object props in the component editor redesign

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Stacked layout and visual feedback when mapping props in the component instance inputs redesign

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refined selector badges with bigger click targets and a custom remove icon

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Canvas now draws visible borders along sidebar and bottom panel edges

<details>
<summary>Release notes</summary>

The component editor and instance inputs redesigns keep evolving, with a new boolean prop switch, refined styling for other props, a stacked instance input layout, and visual feedback when mapping props. Selector badges and canvas borders have also been polished.

</details>

## 1.4.12 · April 15, 2026 {#1-4-12}

- <span className="badge changelog-badge changelog-badge--new">New</span> Populate boolean component props by target-clicking a block on the canvas or in the structure panel — the block is wrapped in `{#if props.boolProp}`.

- <span className="badge changelog-badge changelog-badge--new">New</span> Populate loop component props the same way — the targeted block is wrapped in `{#loop props.loopProp as item}`.

- <span className="badge changelog-badge changelog-badge--new">New</span> A "Create component" button in the Element Settings header converts the selected element into a component in one click.

- <span className="badge changelog-badge changelog-badge--new">New</span> Component prop group and repeater accordions now remember their open/closed state across reloads and navigation, scoped per component, and shared between editor and instance views.

- <span className="badge changelog-badge changelog-badge--new">New</span> Pasting a CSS rule into the style editor now replaces the rule body when the pasted selector matches; non-matching selectors and multi-rule pastes are blocked.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Tooltips on key buttons now show the keyboard shortcut next to the label, slightly dimmed.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The HTML code editor header no longer shows redundant Duplicate and Delete icons.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Empty component prop inputs show "Default" instead of "Value" as placeholder text.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The Add Attributes button has moved into the attributes panel.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The "edit component" keyboard shortcut now works on macOS when Option is held.

<details>
<summary>Release notes</summary>

This release adds target-click population for boolean and loop component props, persists the open/closed state of component prop accordions across reloads, and moves the “Create component” action into the Element Settings header.

</details>

## 1.4.11 · April 13, 2026 {#1-4-11}

- <span className="badge changelog-badge changelog-badge--new">New</span> JS indicator badge on blocks containing `<script>` in the Structure panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Condition inputs automatically strip curly braces when pasting dynamic expressions

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Polished styling for the "Add to AI context" button and AI Panel context block

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refined typographic styles on the selected block overlay

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> HTML Editor rendering regression

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> AI context controls are now hidden when the AI Assistant is disabled

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Label text transform no longer leaks onto sibling elements

<details>
<summary>Release notes</summary>

Etch 1.4.11 fixes a rendering regression in the HTML Editor. Also adds a JS indicator badge for blocks containing `<script>` in the Structure panel, auto-strips curly braces when pasting into condition inputs, and refines styling across the AI Panel and selected block overlay.

</details>

## 1.4.10 · April 9, 2026 {#1-4-10}

- <span className="badge changelog-badge changelog-badge--new">New</span> Block context for AI chat. Right-click HTML blocks in the structure panel to add them as context for AI conversations, with visual pills showing which blocks are included

- <span className="badge changelog-badge changelog-badge--new">New</span> "Remove from AI context" option in the structure panel context menu and dismiss buttons on context pills

- <span className="badge changelog-badge changelog-badge--new">New</span> Default value property-populator for class props

- <span className="badge changelog-badge changelog-badge--new">New</span> Continued implementation of component inputs redesign, we encourage you to test them out and give us feedback

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Passthrough blocks are now properly respected when scrolling into view

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> "scrollbar-gutter: stable" no longer unintentionally affects the canvas iframe

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Pending images are now cleared when opening a new AI conversation

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Pending block context is cleared when starting a new conversation or clearing the chat

<details>
<summary>Release notes</summary>

AI chat now supports **block context,** letting you right-click HTML elements in the structure panel to include their HTML and CSS as context for AI conversations. The **class property** input also gets a new **populator for it’s default value**.

The **redesigned component inputs** introduced in 1.4.9 have continued to evolve. We encourage you to enable them in the settings and share your feedback. Let us know what you think so we can make some final changes before they officially replace the old design!

</details>

## 1.4.9 · April 7, 2026 {#1-4-9}

- <span className="badge changelog-badge changelog-badge--new">New</span> Add `replace` and `replaceAll` modifiers for dynamic content

- <span className="badge changelog-badge changelog-badge--new">New</span> Early preview of redesigned component instance inputs (boolean, select, media, repeater) — available behind the component editor redesign setting, more input types coming soon

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> CSS reset now uses `scrollbar-gutter: stable` to prevent layout shift and `100svh` for more accurate mobile viewport height

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Typing into the HTML editor no longer triggers an incorrect scroll to the wrong component

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> JetEngine custom post types now support custom storage

<details>
<summary>Release notes</summary>

Etch 1.4.9 adds `replace` and `replaceAll` modifiers for dynamic content. It also includes an early preview of redesigned component instance inputs — available behind the component editor redesign setting for those who want to try it out and share feedback. Additionally, this release fixes an HTML editor scrolling issue and adds JetEngine custom storage support.

</details>

## 1.4.8 · April 2, 2026 {#1-4-8}

- <span className="badge changelog-badge changelog-badge--new">New</span> Condition Prop — a new component property type that conditionally shows or hides groups of child props based on an expression, supported in both the Etch Builder and Gutenberg.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI CSS injection — the AI chat can now insert CSS directly into your styles, merging intelligently with existing selectors (AI rules win on conflicts, existing rules are preserved).

- <span className="badge changelog-badge changelog-badge--new">New</span> Replace with AI output — when an element is selected, a new "Replace" button lets you swap it with AI-generated HTML.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Intelligence is now enabled for all users during the beta period.

- <span className="badge changelog-badge changelog-badge--new">New</span> Component Instance Inputs Redesign — refreshed look for text, group, and condition property inputs when using components. Available behind the "Component Instance Inputs V2" setting for early feedback — other prop types (select, loop, etc.) are not yet supported and may not work properly.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> AI error messages from the provider now surface directly in the chat window.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved image paste handling in the AI panel.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Group and repeater props now properly expose to the parent component, and dynamic data is no longer reverted when editing group or repeater inputs.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The `.toSlug()` modifier now correctly handles Unicode characters (German umlauts, Polish letters) at the start of strings, with consistent behavior between the builder and the frontend.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Images always render with an `alt` attribute, even when no value is set in the media library. Also fixed SVGs incorrectly rendering with width/height of "1".

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Long class names in the component editor class prop no longer overflow the UI.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Third-party plugin assets no longer break in the builder iframe due to the asset queue emitting a JSON object instead of an array.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Copying text from the AI chat no longer pastes block JSON into the clipboard.

<details>
<summary>Release notes</summary>

This release introduces **Condition Props**, a new component property type for conditionally showing or hiding groups of props, and enables **Etch Intelligence for all users** during the beta. The AI chat gains **CSS injection** with intelligent selector merging and an **HTML replace** button. Several bugs are fixed around group/repeater prop exposing, Unicode in `.toSlug()`, and the component editor UI.

</details>

## 1.4.7 · March 26, 2026 {#1-4-7}

- <span className="badge changelog-badge changelog-badge--new">New</span> AI chat introduces Build mode — a specialized mode for helping you build pages, alongside the existing Ask mode for general questions

- <span className="badge changelog-badge changelog-badge--new">New</span> Paste or drag-and-drop images into AI chat — share screenshots to have the AI build from a visual reference

- <span className="badge changelog-badge changelog-badge--new">New</span> Repeater prop input in the Gutenberg block editor — add, remove, and populate nested repeater groups directly in the block sidebar

- <span className="badge changelog-badge changelog-badge--new">New</span> Zoomable canvas — ALT+mouse wheel to zoom in and out, with width and zoom percentage inputs for fine-tuning

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Void elements (e.g. `<br>`, `<img>`) no longer get duplicated on the frontend

<details>
<summary>Release notes</summary>

Etch 1.4.7 introduces Build mode in AI chat — a dedicated mode for helping you build pages, with the original conversational mode now available as Ask mode. You can now paste or drag-and-drop screenshots into AI chat to have it build from a visual reference. The canvas gains zoom support via ALT+mouse wheel with precise width and zoom controls. The Gutenberg editor adds support for repeater prop inputs, and a regression where void elements like `<br>` were duplicated on the frontend has been fixed.

</details>

## 1.4.6 · March 25, 2026 {#1-4-6}

- <span className="badge changelog-badge changelog-badge--new">New</span> Repeater prop groups for components — toggle any group prop into a repeater to loop over its items inside the component. When using the component, add, remove, and populate as many entries as needed, each following the prop definitions of the group.

- <span className="badge changelog-badge changelog-badge--new">New</span> ACF post object and relationship fields now respect the return format configured in ACF, returning IDs when set to "ID" instead of always expanding to full objects. Behind the RESPECT_ACF_RETURN_FORMAT feature flag.

- <span className="badge changelog-badge changelog-badge--new">New</span> Paste behavior setting — choose whether to overwrite or preserve existing styles and components on collision (ETC-540)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Builder initial load time reduced by lazy-loading post/template data (ETC-515)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Parent JavaScript now automatically reloads when child elements are added, removing the need to refresh the page (ETC-538)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> CSS editor warns about unbalanced curly braces before saving (ETC-532)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Attributes containing `@`, `:`, or `.` characters (e.g. Alpine.js `@click`, `:class`, `x-on:keydown.enter`) are no longer stripped on the frontend (ETC-550)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Components with groups no longer cause errors when adding classes to parent elements (ETC-541)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Component instance prop values now paste correctly (ETC-539)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Recently added styles no longer disappear due to a race condition when pasting in the HTML editor (ETC-534)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Copy now correctly collects all instances when multiple of the same component are present

<details>
<summary>Release notes</summary>

Etch 1.4.6 introduces repeater prop groups, faster builder load times through lazy-loading, and a new paste collision setting. Attributes with special characters like `@click` are no longer stripped on the frontend, and several bugs around component groups, pasting, and style handling have been resolved.

</details>

## 1.4.5 · March 19, 2026 {#1-4-5}

- <span className="badge changelog-badge changelog-badge--new">New</span> Wrap in span and wrap in anchor options added to the command palette (CMD-K)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> AI chat responses are now faster thanks to optimized reasoning

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> AI chat action buttons polished with distinct icons and clearer layout

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Patterns and components using the legacy block format now paste and insert correctly again in the builder (ETC-530)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Copy and paste now works correctly inside input fields — block-level copy/paste no longer hijacks standard text inputs (ETC-525)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Templates can no longer be accidentally wiped when saving

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Selector mode no longer opens unexpectedly when using Cmd+Enter in AI chat

<details>
<summary>Release notes</summary>

Etch 1.4.5 restores builder support for patterns and components that use the legacy block format, which stopped working after 1.4.4 removed the old parser. It also fixes a community-reported issue where copy/paste was being hijacked inside input fields, and adds a safeguard against accidental template content wipes. On the builder side, the command palette now supports wrapping selections in span and anchor elements.

</details>

## 1.4.4 · March 18, 2026 {#1-4-4}

- <span className="badge changelog-badge changelog-badge--new">New</span> HTML snippets from the AI chat can now be inserted directly into the builder canvas via a dedicated insert button

- <span className="badge changelog-badge changelog-badge--new">New</span> Property data attributes are now exposed on Gutenberg blocks and in the Etch builder, making it easier for third-party developers to target specific property inputs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The legacy custom block conversion logic has been removed. Users migrating from a pre-v1 release must now follow the manual migration steps documented at [https://docs.account.etchwp.com/migration-guides/v1-migration](/migration-guides/v1-migration)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Plain text inputs no longer auto-wrap values in `var()` syntax — this now only applies in the CSS editor and style manager

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dynamic images now always render the `alt` attribute, even when no value is set in the media library

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Settings no longer revert when clicking outside the settings dialog

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> The media property picker in Gutenberg blocks now accepts all media types, not just images

<details>
<summary>Release notes</summary>

Etch 1.4.4 lets you insert HTML snippets from the AI chat directly into the builder canvas and adds property data attributes for third-party developer integrations. This release also removes the legacy custom block conversion logic — if you’re migrating from a pre-v1 release, you’ll need to follow the manual migration guide at [https://docs.account.etchwp.com/migration-guides/v1-migration](/migration-guides/v1-migration). On the bug fix side, dynamic images now always output a valid `alt` attribute, and the media picker in Gutenberg blocks correctly allows all media types.

</details>

## 1.4.3 · March 16, 2026 {#1-4-3}

- <span className="badge changelog-badge changelog-badge--new">New</span> Select, Object, and Class property inputs are now available in the redesigned component editor.

- <span className="badge changelog-badge changelog-badge--new">New</span> Property inputs now include `data-etch-property-key` and `data-etch-property-type` attributes on their wrappers, enabling easier targeting via CSS and JS.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Property icons are now displayed in the redesigned component editor for better visual identification.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> A copy button has been added to property keys for quick access.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Properties are now scrollable when they overflow the panel in the redesigned component editor.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Drag-and-drop in group properties no longer breaks due to stale references.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Resolved ID collisions in dropzones that caused drag-and-drop issues.

<details>
<summary>Release notes</summary>

Etch 1.4.3 completes the component editor redesign, with Select, Object, and Class property inputs, property icons, and improved usability. It also fixes several drag-and-drop issues with group properties and dropzones.

</details>

## 1.4.2 · March 12, 2026 {#1-4-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Redesigned component editor (work in progress) — opt-in preview available in settings, with updated property panels for text, boolean, loop, media, and group props so far

- <span className="badge changelog-badge changelog-badge--new">New</span> Early foundations of Etch Intelligence — the system that will make Etch's AI meaningfully smarter. First pieces are shipping now, much more coming.

- <span className="badge changelog-badge changelog-badge--new">New</span> AI reasoning is now visible in chat responses, with a new setting to toggle the display (on by default)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> AI settings moved to a dedicated tab

<details>
<summary>Release notes</summary>

Etch 1.4.2 ships an opt-in preview of the redesigned component editor, a work in progress with updated property panels for text, boolean, loop, media, and group props so far. AI chat now shows its reasoning by default, and this release lays the first foundations of Etch Intelligence — the system behind a smarter Etch AI.

</details>

## 1.4.1 · March 10, 2026 {#1-4-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Drag and drop props into prop groups

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Media prop pickers now accept all media types, not just images

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Unknown block type error in templates

<details>
<summary>Release notes</summary>

Etch 1.4.1 adds the ability to drag and drop props into groups and broadens media prop pickers to accept all media types. A bug causing an “unknown block type” error while editing templates in the builder was also fixed.

</details>

## 1.4.0 · March 6, 2026 {#1-4-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Group Property to group properties together

- <span className="badge changelog-badge changelog-badge--new">New</span> AI chat now streams responses

- <span className="badge changelog-badge changelog-badge--new">New</span> Wrap words in \<span> and add “Wrap in” commands to Cmd+K

- <span className="badge changelog-badge changelog-badge--new">New</span> Alt+click to deep fold/unfold single structure panel items

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Include custom media definitions in copy/paste

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Selector search no longer requires . or # prefix

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Render up to the render limit and abort further rendering (performance)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Remove undo/redo toggle from settings

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Remove experimental custom media definitions toggle from settings

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Copy/paste of class props

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent BEM classes from being applied to children of hidden or readonly blocks

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Custom media stylesheet not created until reload

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> to-rem not substituted in custom media definitions

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure partial classes are cleaned up

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure blocks have the correct parent reference on undo/redo

<details>
<summary>Release notes</summary>

This update introduces **Group Properties**, **AI chat streaming**, new commands in the CMD+K menu, and **Alt-click deep folding**. It also includes multiple fixes and improvements, particularly around style handling and copy/paste behavior.

</details>

## 1.3.1 · February 27, 2026 {#1-3-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Added "environment.context" dynamic data key

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loop props not always resolving in builder

<details>
<summary>Release notes</summary>

This release fixes a builder only issue of loop props not properly resolving in certain scenarios. It also introduces a new [environment.context dynamic data key](/dynamic-data/dynamic-data-keys#environment-keys).

</details>

## 1.3.0 · February 26, 2026 {#1-3-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Integrate Cmd+Enter into the Command Bar

- <span className="badge changelog-badge changelog-badge--new">New</span> First iteration of Class Property for components

- <span className="badge changelog-badge changelog-badge--new">New</span> Add `keys()` modifier

- <span className="badge changelog-badge changelog-badge--new">New</span> Add `values()` modifier

- <span className="badge changelog-badge changelog-badge--new">New</span> Introduce context awareness for AI Assistant (conversation-aware)

- <span className="badge changelog-badge changelog-badge--new">New</span> Use Alt/Option key to fold/unfold the entire Structure panel when clicking the toggle button

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve category input when creating patterns

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure existing styles are not overwritten on paste

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure stylesheets are properly integrated with Undo/Redo

<details>
<summary>Release notes</summary>

This release introduces several powerful new capabilities, including **integrating the existing Cmd+Enter menu into the Command Bar,** the first iteration of **Class Properties** for components, and new `keys()` and `values()` modifiers. We’ve also added **conversation-aware context for the AI Assistant** and improved structural controls for a smoother workflow.

</details>

## 1.2.0 · February 20, 2026 {#1-2-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> [Experimental] First iteration of Etch-AI Assistant (OpenAI API key required)

- <span className="badge changelog-badge changelog-badge--new">New</span> [Experimental] Allow @custom-media declarations in special stylesheet (tokenized media queries)

- <span className="badge changelog-badge changelog-badge--new">New</span> First iteration of the Undo/Redo engine

- <span className="badge changelog-badge changelog-badge--new">New</span> Add "concentric-radius-reverse" recipe

- <span className="badge changelog-badge changelog-badge--new">New</span> Add "hover-exclude-touch" recipe

- <span className="badge changelog-badge changelog-badge--new">New</span> Add "tooltip" recipe

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Enforce LTR layout in Etch interface (up for discussion)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Overhaul the settings panel architecture and UX

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Hide "Exit" button when not in builder context

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Restrict access to the Etch Builder to administrators only

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The dynamic image element now correctly renders an empty "alt" attribute when explicitly set to an empty string

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure modifiers apply correctly to loops

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure sections are added correctly to the canvas at the top level

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent unnecessary Iconify API calls for specific icons

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent duplicate !important declarations in Gutenberg output

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure component attribute changes are properly reactive

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure consistent tab behavior when the CodeMirror instance is expanded

<details>
<summary>Release notes</summary>

This release introduces the **first experimental version of the Etch-AI Assistant** (requires an OpenAI API key), along with the improved implementation of a full **Undo/Redo engine**. It also adds support for `@custom-media` declarations in a special stylesheet and several new recipes.

Additionally, the settings panel has been overhauled, alongside multiple fixes and stability improvements across the builder.

</details>

## 1.1.0 · February 12, 2026 {#1-1-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> [Experimental] Basic undo/redo support for blocks

- <span className="badge changelog-badge changelog-badge--new">New</span> "intersects" modifier

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> General code quality improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Enhanced styling for CSS comment navigation

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Combobox not reopening on click

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Modifiers not applying correctly within nested loops

<details>
<summary>Release notes</summary>

**Experimental Undo/Redo for Blocks**

This release adds experimental undo/redo functionality for blocks. To use it, enable the feature in the settings panel.

**Please note:**

- This feature is in very early development and may contain bugs or behave unexpectedly. Use with caution, especially on production sites.
- Keyboard shortcuts (Ctrl/Cmd+Z, Ctrl/Cmd+Y) are currently disabled. When enabled, undo/redo buttons will appear in the bottom-left corner of the interface.
- Changes to styles and loops are not yet tracked and will follow in the next iteration.

**Known issues when enabled:**

- We’re aware of performance degradation on larger sites with many components and are actively investigating solutions.

</details>

## 1.0.1 · February 5, 2026 {#1-0-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> "Footer Reveal" recipe

- <span className="badge changelog-badge changelog-badge--new">New</span> Color scheme toggle for etch canvas

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UI/UX tweaks to the settings bar buttons

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Enhanced client side response validation on numerous endpoints

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Updated auto grid recipe

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Updated fade recipes

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Query Monitor warning of undefined array width key

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure correct component is scrolled to

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove diagonal artifacts appearing in canvas on resize

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent exiting component editor while component is still saving

<details>
<summary>Release notes</summary>

Bunch of fixes and improvements, plus a new [color scheme toggle](/interface/canvas-color-scheme)for the etch canvas and updated recipes.

</details>

## 1.0.0 · January 30, 2026 {#1-0-0}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure mandatory styles are deduplicated to avoid key collision

<details>
<summary>Release notes</summary>

A huge milestone! Etch 1.0 is now official. Welcome to Era 4. Also, enjoy this practically non-existent changelog.

</details>

## 1.0.0-rc-8 · January 29, 2026 {#1-0-0-rc-8}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> [Caution] Ensure complex selectors load globally

- <span className="badge changelog-badge changelog-badge--new">New</span> Corner ribbon recipe

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Allow quotes in text nodes within HTML editor for better shortcode representation

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Enhanced client-side API response validation for improved security

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Removed accidental trailing comma in reset styles

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Resolved issue preventing patterns from loading in Gutenberg editor in some edge cases

<details>
<summary>Release notes</summary>

**Note:** This release fixes a longstanding edge case bug where complex user selectors (such as attribute selectors like [data-id], tag selectors like div > p) occasionally fail to load as intended (if you never use these in the selector system, you’ll be unaffected). This typically occurs if your page/post/component has not been opened and saved within Etch for an extended period. In these scenarios, your page styling would have been unintentionally relying on buggy behavior (but this would likely be rare as you already would have seen broken styling).

Please update and verify your pages display correctly on the frontend after updating. If you encounter styling issues we recommend inspecting the affected CSS to identify any selectors that need adjustment. Alternatively, you can temporarily disable “**[TEMP] Load Complex Selectors Globally**” in your settings panel as a quick fallback to previous behavior. This toggle will be removed after we validate it with your feedback. Please report back to us either way as soon as possible.

</details>

## 1.0.0-rc-7 · January 28, 2026 {#1-0-0-rc-7}

- <span className="badge changelog-badge changelog-badge--new">New</span> Allow video selection in media prop

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add client-side validation for API components

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> SVGs not rendering when width and height are set to 0 in `etch:img`

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Editor role missing required permissions in GB

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Standalone images (not in figures) ignoring height auto

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> List tree view icons shrinking in GB

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Media menu not displaying all content types

<details>
<summary>Release notes</summary>

This release addresses a few rendering issues and editor bugs, along with improved client-side API validation and new video support in the media property selector.

</details>

## 1.0.0-rc-6 · January 28, 2026 {#1-0-0-rc-6}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure client-side validation does not block templates from loading

<details>
<summary>Release notes</summary>

This release fixes an issue where client-side validation prevented templates from loading.

</details>

## 1.0.0-rc-5 · January 27, 2026 {#1-0-0-rc-5}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Uncaught TypeError: Etch\\Lifecycle\\WpOptionsContext::delete_transient(): Return value must be of type bool, null returned

<details>
<summary>Release notes</summary>

This release fixes a PHP fatal error

</details>

## 1.0.0-rc-4 · January 27, 2026 {#1-0-0-rc-4}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Revert overeager Component sanitization

<details>
<summary>Release notes</summary>

Reverts Security fix introducing overeager sanitization of Component related properties.

</details>

## 1.0.0-rc-3 · January 27, 2026 {#1-0-0-rc-3}

- <span className="badge changelog-badge changelog-badge--new">New</span> Border check recipe

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent unwanted rewrite on standalone attributes without value

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure component properties keep their casing

<details>
<summary>Release notes</summary>

This release addresses a regression that occurred when Component property keys and names were mistakenly converted to lowercase.

</details>

## 1.0.0-rc-2 · January 27, 2026 {#1-0-0-rc-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Comment navigation within the CSS editor

- <span className="badge changelog-badge changelog-badge--new">New</span> Support for saving and recalling patterns

- <span className="badge changelog-badge changelog-badge--new">New</span> Basic settings panel

- <span className="badge changelog-badge changelog-badge--new">New</span> Added settings toggle to enable font uploads to the WordPress media library

- <span className="badge changelog-badge changelog-badge--new">New</span> Add support for src (static image URLs) on etch:img

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Client-side API response validation

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Blocking of dangerous attribute values in Gutenberg

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Enhanced property sanitization of components, loops, and styles

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Escaping of rogue \<script> when enqueuing JavaScript

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Protection agains path traversal when fetching SVGs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Enhanced file validation when loading SVGs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Improved sanitization URL attributes

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add BEM classes to start and exclude hidden blocks

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better UX for condition inputs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Remove CSS styling inputs in favor of CSS Quick actions

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Replaced the "Add Component" dialog with the CMD+I menu

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Direct search of components and patterns via CMD+I

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Added "Back to WordPress" action to the CMD+K menu

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Deduplicate available slots

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure srcset loads the full image even when matching thumbnail width

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed overflow issues when many templates are present in the Template Manager

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure color swatches are always displayed in the light theme

<details>
<summary>Release notes</summary>

With v1.0.0 approaching, RC2 introduces a fresh set of features, including pattern recall and improved CSS editor navigation, alongside enhanced security and UX refinements. Like the previous release, this update places a strong emphasis on security and stability, ensuring a solid foundation as we move closer to v1.

</details>

## 1.0.0-rc-1 · January 22, 2026 {#1-0-0-rc-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Observability log to help investigate site-specific issues when providing support (documentation pending)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Better timeout protection for YouTube oEmbed requests

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [Security] Enhanced sanitization of remotely sourced SVGs

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure only templates from the active theme are fetched and displayed

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure static inline arrays render correctly in both the builder and the frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent overly aggressive style cleanup during copy-paste operations

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Resolve an issue where shortcuts using the Alt key did not work

<details>
<summary>Release notes</summary>

This is our first **Release Candidate**. These releases are primarily focused on preparing Etch for the v1 launch, with a strong emphasis on **stability** and **security**.

</details>

## 1.0.0-beta-15 · January 21, 2026 {#1-0-0-beta-15}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Proper handling of stringified JSON when sourced from dynamic data and used in conditional logic

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Disable copy functionality on the Component Ghost Wrapper while in the component editor

## 1.0.0-beta-14 · January 20, 2026 {#1-0-0-beta-14}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Image Element

- <span className="badge changelog-badge changelog-badge--new">New</span> WordPress attachment ID–based component property

- <span className="badge changelog-badge changelog-badge--new">New</span> Expose props to parent components for nested components

- <span className="badge changelog-badge changelog-badge--new">New</span> New dynamic data key "environment"

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Flex grid recipe is now responsive by default

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Prevent leaf element icons from shrinking and prevent action clipping in the structure panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Update icons and naming in the CMD+K menu

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve handling of frontend dynamic data resolution

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Incorrect color swatches shown in the Mini GUI for non-color properties

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure all styles are copied when copying an element

<details>
<summary>Release notes</summary>

This release introduces a new [Dynamic Image element](/elements/dynamic-image), WordPress attachment ID–based component properties, and support for exposing props from nested components to their parents, along with a new [“environment” dynamic data key](/dynamic-data/dynamic-data-keys#environment-keys). It also delivers multiple usability improvements and stability fixes throughout the editor.

</details>

## 1.0.0-beta-13 · January 15, 2026 {#1-0-0-beta-13}

- <span className="badge changelog-badge changelog-badge--new">New</span> Overhauled and improved CMD+K menu

- <span className="badge changelog-badge changelog-badge--new">New</span> Ability for third-party plugins to enqueue data into the mini GUI - ACSS alpha-7 recommended

- <span className="badge changelog-badge changelog-badge--new">New</span> Hover preview in CSS Mini GUI context menu [ETC-247]

- <span className="badge changelog-badge changelog-badge--new">New</span> Color swatches for CSS Mini GUI [ETC-249]

- <span className="badge changelog-badge changelog-badge--new">New</span> Exposed shortcut controls for enabling/disabling Etch shortcuts

- <span className="badge changelog-badge changelog-badge--new">New</span> Builder internal hover quick notes [ETC-247]

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> [CAUTION] Reset styles now set images within figures to full width

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Component controls are now in a separate panel [ETC-254]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure images in Metabox custom tables return proper values

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Change the SureCart namespace to avoid conflicts

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure selecting a new style resets the history state within the CSS editor

<details>
<summary>Release notes</summary>

This release introduces a significantly improved [CMD+K menu](/interface/command-bar), and expanded Mini GUI capabilities including hover previews and color swatches. It also delivers several workflow enhancements, including internal builder [quick notes](/utilities/quick-notes), plus a range of bug fixes.

</details>

## 1.0.0-beta-12 · January 12, 2026 {#1-0-0-beta-12}

- <span className="badge changelog-badge changelog-badge--new">New</span> Scroll selected block into view when it's outside of canvas

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Several UI/UX improvements for the Structure-Panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better handling for copy paste shortcuts

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> More complete logic for individual pane resizing state

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent duplicate controls in Gutenberg when block is in loop [ETC-229]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Selecting a component block now only outlines the one component you actually selected and not all instances of this component

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Issue with parsing parenthesized conditions

<details>
<summary>Release notes</summary>

Highlights of this release include automatically scrolling selected blocks into view when they fall outside the canvas, improved pane resizing behavior, and more reliable copy-and-paste shortcuts, along with several UI/UX refinements and bug fixes.

</details>

## 1.0.0-beta-11 · January 9, 2026 {#1-0-0-beta-11}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Issue with loop prop resolving to the wrong loop

## 1.0.0-beta-10 · January 9, 2026 {#1-0-0-beta-10}

- <span className="badge changelog-badge changelog-badge--new">New</span> Ability to alter behavior depending on whether slots are defined (*default* slot content, etc.) [ETC-240]

- <span className="badge changelog-badge changelog-badge--new">New</span> Loop argument support for loop props [ETC-181]

- <span className="badge changelog-badge changelog-badge--new">New</span> Persist individual panel sizes and UI state on a per-user basis [ETC-178]

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto-wrap images in figure and image-specific right click options

- <span className="badge changelog-badge changelog-badge--new">New</span> Ability to search for components

- <span className="badge changelog-badge changelog-badge--new">New</span> Gradient expansions

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better handling of delete shortcut

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various structure panel UI/UX improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various resize handle UI/UX improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various mini GUI UI/UX improvements [ETC-238]

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Remove flex-div from elements-bar to avoid confusion

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various fixes regarding attribute input [ETC-177]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> ENABLE_WAF_BLOCK_REQUEST_WORKAROUND feature flag to ensure saving blocks works in Hostinger configurations [ETC-214 - transitional fix]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Avoid deselecting block on closing dialog with escape

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> SureCart SDK incompatibility with Windows in Etch Theme

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Issue with truncateChars and truncateWords not working with props as arguments [ETC-232]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Issue with non-Etch patterns being listed as components [ETC-241]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dimension badge jittering in certain cases [ETC-233]

<details>
<summary>Release notes</summary>

This release introduces [conditional slot-based behavior](/components/slots#the-slots-object), [loop argument support for loop props](/components/props/prop-loop#loop-props-with-loop-arguments), and per-user persistence of panel sizes and UI state, significantly improving flexibility and personalization.

It also adds component search, image auto-wrapping with enhanced context options, gradient expansions, multiple UI/UX refinements, and a broad set of stability and compatibility fixes.

</details>

## 1.0.0-beta-9 · December 19, 2025 {#1-0-0-beta-9}

This release fixes an issue with license activation introduced in beta-8.

## 1.0.0-beta-8 · December 19, 2025 {#1-0-0-beta-8}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove unnecessary recursion that was affecting component editing performance [ETC-231]

- <span className="badge changelog-badge changelog-badge--new">New</span> Added Pseudo Recipes to autocomplete

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> The Etch-Theme is now a separate SureCart product allowing for easier management and automatic updates (docs coming soon)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Change \<= to >= for media query

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add static buttons for has-me, container-query and media-query to CSS Toolbar

<details>
<summary>Release notes</summary>

Added pseudo recipe autocomplete, improved CSS tools and media query handling, separated the Etch Theme for smoother updates, and fixed a performance issue that affected the component editing experience.

</details>

## 1.0.0-beta-7 · December 18, 2025 {#1-0-0-beta-7}

- <span className="badge changelog-badge changelog-badge--new">New</span> Possibility to create custom values in the CSS Mini GUI [ETC-221]

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better handling of theme specific template reseting (index, 404) [ETC-153]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Force dark mode within Etch builder [temporary]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Return array when multiple meta fields with same key are present [ETC-168]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Styling improvements and smaller fixes

<details>
<summary>Release notes</summary>

This release adds support for **custom values in the CSS Mini GUI**, allowing you to manage your own CSS snippets using project-specific variables.

Template handling for Etch-provided templates has been improved, and templates can now be **reset to their original state**.

Dark mode is temporarily enforced to fix readability issues with the CSS toolbar until the app is fully migrated to the new color system.

</details>

## 1.0.0-beta-6 · December 16, 2025 {#1-0-0-beta-6}

- <span className="badge changelog-badge changelog-badge--new">New</span> Context menu for CSS mini GUI

- <span className="badge changelog-badge changelog-badge--new">New</span> Add multiple CSS quick actions (position, effects, etc.)

- <span className="badge changelog-badge changelog-badge--new">New</span> New recipe "flex-grid"

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Update CSS mini GUI styling

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Update color-mix recipe

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Update content-grid, variable-grid, auto-grid recipes

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> ETC-220: Props not passing to child component on frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix grid expansions adding an extra closing curly brac

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> ETC-219: Fix bracket notation parsing issue within modifiers

<details>
<summary>Release notes</summary>

This release addresses several bugs, including issues with passing props to nested child components and problems related to bracket notation. It also introduces additional options in the **CSS Mini GUI**: right-clicking now opens a **context menu** that lets you select from a set of predefined defaults.

</details>

## 1.0.0-beta-5 · December 12, 2025 {#1-0-0-beta-5}

- <span className="badge changelog-badge changelog-badge--new">New</span> API for third parties to inject icons throughout the Etch UI (docs coming soon)

- <span className="badge changelog-badge changelog-badge--new">New</span> Expose Etch block attributes in Gutenberg

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Enable changing images in Gutenberg Etch blocks

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refresh style for CSS selector pills

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refine panel styling for hidden items

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure failed `expression_result` returns the original `{expression}` in string replacements

<details>
<summary>Release notes</summary>

This release enables you to change images and edit attributes on Etch blocks in Gutenberg, as well as a number of other improvements and fixes. As with all beta releases, we **strongly recommend a backup** before updating.

</details>

## 1.0.0-beta-4 · December 9, 2025 {#1-0-0-beta-4}

- <span className="badge changelog-badge changelog-badge--new">New</span> Support main query for archive templates [ETC-208]

- <span className="badge changelog-badge changelog-badge--new">New</span> Correctly parse `item.content` within `etch:html` [ETC-211]

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Enable CSS toolbar by default and reverse order in panel toggles

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Correct rendering of relative SVG URLs on the frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Resolve issues with CSS Editor in fullscreen mode

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Blocks no longer randomly disappear when reordered [ETC-210]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Style no longer remains visible in CSS box when it shouldn’t [ETC-212]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Properly restore dynamic data context when using slots in nested components [ETC-202]

<details>
<summary>Release notes</summary>

This update introduces **full support for the main query in archive templates**, so you no longer need to create a custom query — you can use the default WordPress query directly. It also fixes several key issues, including block reordering, CSS visibility, SVG rendering, and proper slot context restoration within nested components.

</details>

## 1.0.0-beta-3 · December 4, 2025 {#1-0-0-beta-3}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> CSS Variables not loading within Etch

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Accidental overwrite of selected block style on change in style manager

<details>
<summary>Release notes</summary>

Fixed issue with selected style being overwritten when changing something in style manager.

</details>

## 1.0.0-beta-2 · December 4, 2025 {#1-0-0-beta-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Make CSS Toolbar cursor aware [ETC-207]

- <span className="badge changelog-badge changelog-badge--new">New</span> Support for JS/PHP like bracket notation in dynamic data [ETC-194]

- <span className="badge changelog-badge changelog-badge--new">New</span> Add possibilty to define “fallback loop arguments” [ETC-206]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Allow usage of rightclick paste in Firefox [ETC-173]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Don't emit deprecation warning when deprecated stylesheet filter isn't used

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent accidental svelte shorthand during HTML formatting

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure toString properly handles falsy values [ETC-201]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix styling issues in tooltip in CSS Toolbar

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix date format mismatches between JS and PHP in certain edge cases

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> ACF Post Object fields with "Multiple: No" return empty arrays in Etch data layer [ETC-171]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dependency updates and smaller fixes

<details>
<summary>Release notes</summary>

This release includes a more intuitive **CSS Toolbar**, [fallback loop arguments](/loops/loop-arguments#default-argument-values), improved dynamic data accessing using [bracket notation](/dynamic-data/dynamic-data-keys#accessing-data-in-arrays), and general bug fixes and refinements. Dot-notation containing special characters is **deprecated** and **will be removed in a future update**. See community post for more details.

</details>

## 1.0.0-beta-1 · November 28, 2025 {#1-0-0-beta-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS mini-GUI

- <span className="badge changelog-badge changelog-badge--new">New</span> Hooks to enqueue styles and scripts in the Etch preview area

- <span className="badge changelog-badge changelog-badge--new">New</span> Modifiers: unserializePHP

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Etch UI styles (start)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better handling when adding styles from HTML; also prevent creating a class like "fooB" when the user typed too much and deleted back to "foo"

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Adjust concat modifier to better align with PHP behavior

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Empty arrays were incorrectly treated as undefined in loops inside the builder

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Don’t attempt to run the custom blocks migration on fresh sites

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Handle empty attributes in Etch the same way as on the frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Style: Minor calendar-icon styling issue in Content Hub

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prefer kebabCase for post slugs to match native WordPress behavior [ETC-156]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> After creating a CPT in Content Hub, templates now appear in the Templates Manager without refresh [ETC-183]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> When a badge touches the right canvas edge, ensure it’s positioned at right: 0 [ETC-182]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Stop generating additional styles when typing classes in the HTML editor [ETC-180]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Add hover display state for raster footer to resolve a Safari issue [ETC-169]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Allow copy/paste in component title and description [ETC-167]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Allow copy/paste in editable blocks on the canvas [ETC-152]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> SVG rendering in Gutenberg [ETC-146]

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prefer use plain css comment over sass comment in css panel

<details>
<summary>Release notes</summary>

This release introduces the first iteration of the **CSS toolbar** — a new way to **quickly insert commonly used CSS properties** into your code. Over time, it will replace the existing CSS style inputs. You can enable it using the toggle in the “Hide/Show panel” in the bottom-left corner of the UI. If you encounter issues and need to turn it off via code, simply disable the “CSS_MINI_GUI” feature flag (see the [feature flag documentation](/feature-flags) for details). The toolbar is still a work in progress, and more improvements will follow in upcoming releases.

Alongside this, you’ll find a variety of small fixes and enhancements. Stability has been looking strong, and with this release we’re officially moving into beta. We maintain backwards compatibility as much as possible, but **backups are always recommended**.

</details>

## 1.0.0-alpha-15 · November 20, 2025 {#1-0-0-alpha-15}

- <span className="badge changelog-badge changelog-badge--new">New</span> Editor: Added “Convert to Raw HTML” option in the right-click menu

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Gutenberg: Post title is now hidden for Etch pages (use `HIDE_TITLE_IN_BLOCK_EDITOR` to disable)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Migration: Non-Etch blocks were being converted unintentionally

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Migration: Archive dynamic data not resolving correctly

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Modifiers: truncate() not working properly in the builder

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Gutenberg: id-based styles not rendering correctly in the builder

<details>
<summary>Release notes</summary>

This release wraps up the final outstanding issues from the custom blocks migration and gets Etch ready to move out of alpha. The next version will likely be **beta-1**. As always, be sure to **take a backup before upgrading**.

</details>

## 1.0.0-alpha-14 · November 19, 2025 {#1-0-0-alpha-14}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Performance: Skip unnecessary native WordPress processing of inner blocks

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Performance: Enhanced caching for components and loops

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Content Hub: Pages view now opens by default

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Migration: More detailed error messages when a migration fails

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Gutenberg: Images inside \<style> tags only rendered when paths were relative

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Editor: Post titles displayed "&amp;" as "&amp;amp"

<details>
<summary>Release notes</summary>

This release addresses the remaining issues from our custom blocks migration, including some performance regressions from alpha-11. If you have experienced issues with the migration, please try upgrading from -alpha-8. **Make a backup before upgrading**.

</details>

## 1.0.0-alpha-13 · November 18, 2025 {#1-0-0-alpha-13}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Dynamic data caching (may also resolve “maximum execution time” errors)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> HTML entities (e.g., dashes) in `page.title` were not being decoded

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Etch API was accessible to site visitors (now restricted to logged in users with capability to use Etch)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Shortcodes not resolving inside components used within templates

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remote SVGs containing inline `style` attributes

<details>
<summary>Release notes</summary>

This release addresses more of the remaining issues from our custom blocks migration. If you have experienced issues with the migration, please try upgrading from -alpha-8. **Make a backup before upgrading**.

</details>

## 1.0.0-alpha-12 · November 17, 2025 {#1-0-0-alpha-12}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add all WP_Post properties in dynamic data (docs WiP)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add support for Setting Page ID for Meta Box Option Page

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Whitescreen caused by missing crypto.randomUUID function

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Broken component editor view (everything turns into component)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> HTML strings output as HTML strings on the frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Unwanted whitespaces between elements on the frontend

<details>
<summary>Release notes</summary>

This release addresses most of the remaining issues from our custom blocks migration. If you have not upgraded to -alpha-9, -alpha-10, or -alpha-11, we recommend you upgrade directly to alpha-12. Make a backup before.

</details>

## 1.0.0-alpha-11 · November 14, 2025 {#1-0-0-alpha-11}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Memory exhaustion caused by infinite recursion when a component was nested inside itself

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Shortcodes not resolving when used in templates

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Whitescreen triggered by crypto.randomUUID not being a function

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Unnecessary post-content wrapper

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Unnecessary spaces inserted between tags

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Modifier-in-modifier combinations not working

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> concentric radius recipe

<details>
<summary>Release notes</summary>

This release addresses most of the remaining issues from our custom blocks migration. If you have not upgraded to -alpha-9 or -alpha-10, we recommend you upgrade directly to alpha-11. Make a backup before.

</details>

## 1.0.0-alpha-10 · November 13, 2025 {#1-0-0-alpha-10}

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch:HTML element

- <span className="badge changelog-badge changelog-badge--new">New</span> Recipe: is-bg

- <span className="badge changelog-badge changelog-badge--new">New</span> Archives: Add support to \{archive\} to retrive archive data as title, description and url

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> SVG: Properly strip colors from on the frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> GB: Ensure variables also load in the block editor

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> GB: Fix inline style attribute not working

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Components: Make props resolve defaults properly

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Migration: Run in smoother steps to avoid triggering WAFs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> GB: add !important to user defined overflow wrap to beat override default GB styles

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Ensure reset styles are also inlined on the frontend

<details>
<summary>Release notes</summary>

This release addresses some of the issues reported with our custom blocks migration. If you have not upgraded to -alpha-9, we recommend you upgrade directly to alpha-10. Make a backup before.

</details>

## 1.0.0 Alpha-9 · November 12, 2025 {#1-0-0-alpha-9}

- <span className="badge changelog-badge changelog-badge--new">New</span> New Block Authoring Architecture (See Blog Post)

- <span className="badge changelog-badge changelog-badge--new">New</span> Block Authoring: Support for Slots

- <span className="badge changelog-badge changelog-badge--new">New</span> Block Authoring: Support for Dynamic Data

- <span className="badge changelog-badge changelog-badge--new">New</span> Block Authoring: Support for Custom JS

- <span className="badge changelog-badge changelog-badge--new">New</span> Native Recipe System (v1)

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Placeholder Theme: Update to 0.0.2

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Template Manager: Deletion Requires Confirmation

<details>
<summary>Release notes</summary>

This is a major architectural update that requires a 1-click update inside of the builder. Make a backup prior to updating.

</details>

## 1.0.0 Alpha-8 · November 5, 2025 {#1-0-0-alpha-8}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Convert any element to Element Element (soon "Tag" Element) via Right Click

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Change any element to Tag Element via structure panel

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Make it possible to remove the tag from the tag input on etch:element

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Preserve unicode in query parameters

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Add links in labels to block exclusion

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> ACF: Fix the File field returning empty array

<details>
<summary>Release notes</summary>

More stability and UX.

</details>

## 1.0.0 Alpha-7 · October 27, 2025 {#1-0-0-alpha-7}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix inline canvas editing

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix right click menu not disappearing

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix SVGs in Figures

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix loop rendering in Gutenberg

<details>
<summary>Release notes</summary>

Batch of fixes.

</details>

## 1.0.0-alpha-6 · October 24, 2025 {#1-0-0-alpha-6}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix "Save failed" issue

  1.0.0-alpha-5 introduced an issue where a "Save failed" message would be displayed, even though the page or template would save successfully.

## 1.0.0 Alpha-5 · October 23, 2025 {#1-0-0-alpha-5}

- <span className="badge changelog-badge changelog-badge--new">New</span> JetEngine: Options Page Support

- <span className="badge changelog-badge changelog-badge--new">New</span> JetEngine: Term &amp; User Support

- <span className="badge changelog-badge changelog-badge--new">New</span> Modifiers: stripTags()

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove Tag Attribute from Element Element Output

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix List Styling in Builder

<details>
<summary>Release notes</summary>

More stability and solidification stuff.

</details>

## 1.0.0-alpha-4 · October 21, 2025 {#1-0-0-alpha-4}

- <span className="badge changelog-badge changelog-badge--new">New</span> MetaBox: Support for Options Pages

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: Comparison modifiers

  See [https://docs.account.etchwp.com/dynamic-data/dynamic-data-modifiers/comparison-modifiers](/dynamic-data/dynamic-data-modifiers/comparison-modifiers)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Rename rem() to to-rem()

  We renamed this due to a conflict with the already existing [CSS rem function](https://developer.mozilla.org/en-US/docs/Web/CSS/rem).

  A migration will automatically happen when upgrading Etch, so you won't have to manually rename anything.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loops: Fix legacy loop format migration causing loops to disappear on the frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Loops: Fix adding of loop block via element panel

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dynamic Data: Fix currentDate accidentally applying timezone twice

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix incorrect emoji style removing (doing it wrong warning)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Avoid loading frontend preprocessing inside of builder

## 1.0.0 Alpha-3 · October 16, 2025 {#1-0-0-alpha-3}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Element

- <span className="badge changelog-badge changelog-badge--new">New</span> ACF: Support for Options Pages

- <span className="badge changelog-badge changelog-badge--new">New</span> Loops: Expose/Output Loop Index

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Loops: General Cleanup &amp; Future Proofing

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Content Hub: Show 3rd Party CPTs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> ACF: Normalize All Fields

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Grab post excerpt automatically &amp; properly

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> JS: Load per render instance and not per block

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> GB: Enqueue etch-default and etch-reset CSS

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> GB: Fix links in core blocks not rendering

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix figure elements not accepting multiple child elements

<details>
<summary>Release notes</summary>

Continuing the march toward v1 stable.

</details>

## 1.0.0-alpha-2 · October 9, 2025 {#1-0-0-alpha-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Use site language in dateFormat

- <span className="badge changelog-badge changelog-badge--new">New</span> Improve hidden element visibility in structure panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Respect muted attirbute for video and audio element in builder

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Make instant structure sort toggleable

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Always add xmlns to svg by default

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> General Gutenberg improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Streamline template preview fetching

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better loop caching to avoid multiple calls during initial load

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Forbid invalid chars for tags in tag property input

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Forbid invalid chars for tags in structure item

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better handling of copy paste failures

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent WP from converting ASCII emojis

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure loops are also copied when only specified in component props

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Properly handle non inline stuff when saving label

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Allow tabindex 0 on frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix fullscreen button not showing up in sidebar for css panel

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix user data mismatch between builder and frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Render svgs with old xmlink:href syntax in builder

<details>
<summary>Release notes</summary>

Stability improvements and bug fixes.

</details>

## 1.0.0-alpha-1 · October 2, 2025 {#1-0-0-alpha-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: Support for Meta Box Phase 1

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Copy/Paste: Fixes &amp; Improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put ENABLE_WAF_COMPATIBILITY_WORKAROUND in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put ENABLE_PREPROCESSOR in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put REMOVE_WP_DEFAULT_CSS in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put ...REDUCED_CONTEXT...PERFORMANCE... in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put REGISTER_CUSTOM_TAXONOMIES in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put AVOID_DOM_PARSER_REMOVE_WRAPPER in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put INLINE_ETCH_ASSETS in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put CONVERT_REM_FUNCTIONS in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put ENABLE_INSTANT_STRCUTRE_SORT in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put ENABLE_STRUCTURE_PANEL_V2 in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put COMPONENTS-COPY-PASTE in core

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Put GLOBAL_STYLESHEETS in core

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix for Right Click Menu

<details>
<summary>Release notes</summary>

We made it! Of course, most users feel like the product is well beyond feeling like a 1.0, so we want to reiterate that version numbers are just version numbers. [Read this post for more insights on what 1.0 really means](https://account.etchwp.com/blog/etch-v1-0-what-users-need-to-know/).

</details>

## 0.42.1 · September 30, 2025 {#0-42-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix content slot not appearing on frontend if used on component top level

<details>
<summary>Release notes</summary>

Final release of the 0.x branch. The next release will be 1.0.0-alpha-1.

</details>

## 0.42.0 · September 30, 2025 {#0-42-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data Modifiers: truncateWords, truncateChars, startsWith, endsWith, length, reverse, at, sort, slice, urlEncode, urlDecode, indexOf, split, concat

- <span className="badge changelog-badge changelog-badge--new">New</span> Use Dynamic Data Keys in Modifiers

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve Array Handling of JetEngine Media

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve Support for Relative URL Paths for SVG Element

<details>
<summary>Release notes</summary>

More goodies.

</details>

## 0.41.1 · September 26, 2025 {#0-41-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: JetEngine Support for Repeater Fields

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: JetEngine Support for Gallery Fields

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: JetEngine Support for Image Fields

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various fixes and improvements

<details>
<summary>Release notes</summary>

Etch adds support for JetEngine repeaters, images, and gallery fields.

</details>

## 0.41.0 · September 25, 2025 {#0-41-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Components: Object Prop

- <span className="badge changelog-badge changelog-badge--new">New</span> New Element: Dynamic SVG

- <span className="badge changelog-badge changelog-badge--new">New</span> Style Panel: Background Layers (Experimental)

- <span className="badge changelog-badge changelog-badge--new">New</span> Style Panel: Background Image

- <span className="badge changelog-badge changelog-badge--new">New</span> Style Panel: Background Color Mix

- <span className="badge changelog-badge changelog-badge--new">New</span> Basic Support for style Tags in Editor

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: readingTime

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: applyData()

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved Dynamic Data Parsing

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> .toString() now works with arrays/objects

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> .includes() now works on strings

<details>
<summary>Release notes</summary>

Components get massively more flexible with the introduction of the Object Prop and we’re starting to ship background layer controls for the styling panels. Have fun!

</details>

## 0.40.0 · September 18, 2025 {#0-40-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> New Dynamic SVG Element

- <span className="badge changelog-badge changelog-badge--new">New</span> Save Changes Warning: Loops, Style Manager, Components, Posts, Pages

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: toSlug()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: floor()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: round()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: ceil()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: toStr()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: toInt()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: trim(), lTrim() and rTrim()

- <span className="badge changelog-badge changelog-badge--new">New</span> New Modifier: dateFormat() and numberFormat()

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Begin Phase 2

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Minor Fixes

<details>
<summary>Release notes</summary>

Much requested support for dynamic SVGs in components is here, among lots of other super useful utilities.

</details>

## 0.39.0 · September 11, 2025 {#0-39-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Stylesheet Manager

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Save Components Without Reload &amp; Without Losing Element Focus

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve Drag Handle Interaction Styling (Interface)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improvements to Class Handling on Copy/Paste

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improvements to Dynamic Data Parsing

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Saving Issues on LiteSpeed Servers

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> General Stability Improvements &amp; Bug Fixes

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Classes Not Rendering on Elements in Figures

<details>
<summary>Release notes</summary>

More CSS flexibility ships alongside a bunch of DX and stability improvements.

</details>

## 0.38.0 · September 4, 2025 {#0-38-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Templating: Create Category &amp; Tag Archive Templates

- <span className="badge changelog-badge changelog-badge--new">New</span> Templating: Create Custom Taxonomy Templates

- <span className="badge changelog-badge changelog-badge--new">New</span> Templating: New Dynamic Data Tags for Taxonomies

- <span className="badge changelog-badge changelog-badge--new">New</span> Templating: New Post Preview Selector

- <span className="badge changelog-badge changelog-badge--new">New</span> Responsive Workflow: Full-Time Responsive Mode

- <span className="badge changelog-badge changelog-badge--new">New</span> Responsive Workflow: Add Left-Side Drag Handle

- <span className="badge changelog-badge changelog-badge--new">New</span> Responsive Workflow: Round Pixel Values

- <span className="badge changelog-badge changelog-badge--new">New</span> Rem() Function

- <span className="badge changelog-badge changelog-badge--new">New</span> Responsive Workflow: Dynamic Queries Now Use Rem() Function

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Drag &amp; Drop: Turn Instant Canvas Tracking Flag on By Default

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Templating: Renamed "Catch All" to "Index"

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove Container Name From "Has Me" Selector

<details>
<summary>Release notes</summary>

POWER UPDATE! Note: This is a huge update, but the most significant new game-changing feature for responsive workflow has been pushed to next week. Additionally, some new features are Etch/Front only and are still making their way into Gutenberg. Stay tuned.

</details>

## 0.37.0 · August 28, 2025 {#0-37-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Canvas: Dynamically Measure Canvas

- <span className="badge changelog-badge changelog-badge--new">New</span> Canvas: Dynamically Measure Elements

- <span className="badge changelog-badge changelog-badge--new">New</span> Canvas: Fluidly Resizable Canvas

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: Add join() &amp; includes() modifers

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Gutenberg: Improve Inline Style Handling

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Custom Fields: Key Validation

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Copy &amp; Paste: Improve Class Handling

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Copy &amp; Paste: Improve Handling of Nested Components

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Copy &amp; Paste: Improve Paste Accuracy

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Copy &amp; Paste: Improve Loop Handling

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Copy &amp; Paste: Improve Pasting on Blank Canvas

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Interface: Reduce Render Errors &amp; Interfacing Freezing

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Structure Panel: Improve Label Renaming

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Drag &amp; Drop: Additional UX &amp; Performance Improvements

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fail to Save: Improve Compatibility with WAFs

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Overaggressive Link Reset Styling Breaking GB Links

<details>
<summary>Release notes</summary>

With 0.37.0, Etch ushers in the next era of responsive development being the first visual development environment to implement and encourage a container-query-first approach.

</details>

## 0.36.2 · August 22, 2025 {#0-36-2}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix SSL Dependency

<details>
<summary>Release notes</summary>

Quick update to resolve needing SSL to load the builder.

</details>

## 0.36.1 · August 21, 2025 {#0-36-1}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Turn on copy/paste by default

<details>
<summary>Release notes</summary>

This release is just to turn on component/pattern import/export functionality (copy/paste) by default.

</details>

## 0.36.0 · August 21, 2025 {#0-36-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Component Import/Export — Alpha

- <span className="badge changelog-badge changelog-badge--new">New</span> Pattern Import/Export — Alpha

- <span className="badge changelog-badge changelog-badge--new">New</span> Support for srcset for images (outside of components for now)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Content Hub: Major Architectural &amp; Performance Improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Structure Panel: UI Improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Deprecate Canvas Drag &amp; Drop

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Duplication of BR tags

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent and sanitize invalid characters in slot names

<details>
<summary>Release notes</summary>

This release ships Step #1 of pattern and component import/export via simple copy and paste. You can now share patterns and components across sites. This functionality will expand over the next few release cycles.

</details>

## 0.35.2 · August 18, 2025 {#0-35-2}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Structure Panel: Improve Hierarchy Visibility

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Structure Panel: Tighten Indentations

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Structure Panel: Add Drop Zone UI Indication for Drag &amp; Drop

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Structure Panel: Fix inability to label structure panel items that are un-labeled

<details>
<summary>Release notes</summary>

This release is focused mostly on bringing more UX improvements to the structure panel hierarchy as well as structure panel drag and drop.

</details>

## 0.35.1 · August 15, 2025 {#0-35-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix issue with disappearing elements on drag and drop

<details>
<summary>Release notes</summary>

Hotfix release for drag and drop. There could be some additional edge cases. This is a [flagged feature](/feature-flags) so you can enable or disable it without having to rollback your updates.

</details>

## 0.35.0 · August 14, 2025 {#0-35-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> New Drag &amp; Drop System for Structure Panel (Beta)

- <span className="badge changelog-badge changelog-badge--new">New</span> Escape Now Closes "Hub" Panels

- <span className="badge changelog-badge changelog-badge--new">New</span> Current Date Dynamic Data Key (site.currentDate)

- <span className="badge changelog-badge changelog-badge--new">New</span> Gutenberg: Render Slot Content

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better Indention for Structure Panel Children

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various Minor Fixes for Preview Rendering &amp; Component Recursion

<details>
<summary>Release notes</summary>

The extension of the new drag and drop system to the structure panel should resolve a major builder performance issue caused by the previous drag and drop library while also improving drag and drop UX.

</details>

## 0.34.0 · August 7, 2025 {#0-34-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> New Drag &amp; Drop System (Partial)

- <span className="badge changelog-badge changelog-badge--new">New</span> Components: Drag &amp; Drop to Re-Order Props

- <span className="badge changelog-badge changelog-badge--new">New</span> Components: Image, Boolean, Select Prop Support in Gutenberg

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Components: Attach Metadata in Gutenberg When Adding From Pattern Library

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Click Inside Highlighted Text in Code Editor

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed Multiple Element Add Bug in Firefox

<details>
<summary>Release notes</summary>

The drag and drop system is being refactored for buttery-smooth interactions, drop accuracy, and performance impact. You can see it in action in the component editor! This new D&amp;D system will eventually replace D&amp;D everywhere in the app.

</details>

## 0.33.1 · August 5, 2025 {#0-33-1}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Gutenberg: Render Components Without Wrapper

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Gutenberg: Fix Issue With Slot &amp; Dynamic Data Rendering

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Append preview=true for draft page/post support

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix react issue with paragraph block children

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Ensure styles are still loaded in the block editor when Gutenberg in non-iframe mode

<details>
<summary>Release notes</summary>

Bug fixes and improvements.

</details>

## 0.33.0 · July 31, 2025 {#0-33-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Block Authoring: Support for Loops

- <span className="badge changelog-badge changelog-badge--new">New</span> Block Authoring: Support for Dynamic Data

- <span className="badge changelog-badge changelog-badge--new">New</span> Gutenberg: Support for Attributes

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: New CPT Creation Flow

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Text Area Custom Field Type

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Number Custom Field Type

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Boolean Custom Field Type

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Inline Etch Default Stylesheets to Prevent Render Blocking

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Up to 70% TTFB Improvement

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed Side Effects of Prior TTFB Improvement in 0.32.0

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed an Issue With Top Level Loop Not Looping

<details>
<summary>Release notes</summary>

Another big leap forward for Gutenberg Authoring, performance, and content management.

</details>

## 0.32.0 · July 30, 2025 {#0-32-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Internal TTFB Testing Tool

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> TTFB Optimization for Static Elements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Loop Combobox Accepts Custom Loops

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Minor Enhancements

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix for Custom Fields as Objects Instead of Arrays

- <span className="badge changelog-badge changelog-badge--breaking">Breaking</span> Logic Update to Support Strict &amp; Loose

<details>
<summary>Release notes</summary>

Small release prior to cart opening. Expect another release this week.

</details>

## 0.31.0 · July 24, 2025 {#0-31-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Remove Dependencies &amp; Create Natively

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Create/Delete Pages

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Create/Delete Posts in CPT

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Create/Delete Fields in Field Group

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Draggable Column Width

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub: Navigate Directly to Any Page/Post

- <span className="badge changelog-badge changelog-badge--new">New</span> Gutenberg: Render Components &amp; Expose Props

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: URL Keys &amp; Query Parameters

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Rename Array Prop to "Loop"

- <span className="badge changelog-badge changelog-badge--new">New</span> Context Menu: 1-Click Wrap in Div, Loop, or Condition

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Components: Prop Preview on by Default

- <span className="badge changelog-badge changelog-badge--new">New</span> Many Small QOL Improvements

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Encoding Issue Blocking CSS Range Syntax

<details>
<summary>Release notes</summary>

Etch continues to get better and better every week. We’re still hoping to open the cart for everyone again by the end of July, so stay tuned!

</details>

## 0.30.0 · July 17, 2025 {#0-30-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Block Authoring: Static Block Authoring 2.0

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Manager: Inline Post Creation

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Manager: Inline Post Deletion

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: User Keys (Injection &amp; Conditions)

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: Site Keys (Injection &amp; Conditions)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Inject Page/Template Name In Structure Header

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed Loop Props in Components

<details>
<summary>Release notes</summary>

Gutenberg continues to throw shots, but we’re bobbing and weaving like Floyd Mayweather.

</details>

## 0.29.0 · July 14, 2025 {#0-29-0}

- <span className="badge changelog-badge changelog-badge--breaking">Breaking</span> Performance: Pre-Processor

  It's possible that this update could cause small breakages that would need to be manually fixed.

- <span className="badge changelog-badge changelog-badge--new">New</span> Loop Manager

<details>
<summary>Release notes</summary>

We are integrating our performance pre-processor as well as the new loop manager. **The performance pre-processor could cause minor breakages that require manual fixing, so update on a staging site first.**

</details>

## 0.28.1 · July 4, 2025 {#0-28-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix for nested loops breaking in 0.28.0

## 0.28.0 · July 3, 2025 {#0-28-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Performance: Pre-Processor Implementation Step 1 (Static Elements)

  We've reached the limits of two of the WP hooks used for rendering, so we're building a pre-processor to take the weight off those hooks. This is a 4-step process to cover static elements, components, loops, and conditions. This release ships step 1, with significant performance improvements for static data and nested static data. We think this new architecture will be the fastest possible rendering architecture possible in WordPress.

- <span className="badge changelog-badge changelog-badge--new">New</span> Loops: Accept Named Arguments &amp; Dynamic Data

- <span className="badge changelog-badge changelog-badge--new">New</span> Variable Conversion: Auto convert "trans" variables to color-mix() functions

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> SVGs now work in span tags (outside of components/loops temporarily)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Improve object handling for dynamic data in frontend

  There was an issue of actual WP object not being properly resolved on the frontend, related to the one with the terms

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Actually allow top level dynamic data access e.g. \{item\} on frontend

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix text-transform carrying over on canvas edit

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix img prop not being displayed properly on component instance

## 0.27.0 · June 26, 2025 {#0-27-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Loop: Query Taxonomies

- <span className="badge changelog-badge changelog-badge--new">New</span> Loop: Query Users

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub (Alpha): Interface

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub (Alpha): List All Posts, Pages, and CPTs

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub (Alpha): Create CPT

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub (Alpha): Create &amp; Assign Custom Field (Text)

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub (Alpha): Delete CPT

- <span className="badge changelog-badge changelog-badge--new">New</span> Content Hub (Alpha): CRUD Routing Architecture

- <span className="badge changelog-badge changelog-badge--new">New</span> ACF Support for User Loops

- <span className="badge changelog-badge changelog-badge--new">New</span> ACF Support for Terms

- <span className="badge changelog-badge changelog-badge--new">New</span> Nested CSS: Enable SCSS nesting syntax/stemming of &amp; selector

- <span className="badge changelog-badge changelog-badge--new">New</span> Array Prop: Allow Passing of Dynamic Data

- <span className="badge changelog-badge changelog-badge--new">New</span> Array: Select Existing Loop Source

- <span className="badge changelog-badge changelog-badge--new">New</span> Passthrough Block: Support for Block Labels

<details>
<summary>Release notes</summary>

Another big and exciting release, but very much a work-in-progress release. We're focused on making some progress across a broad range of areas at the moment and we'll slowly go deeper in each area week by week.

Note: This release / ACSS 4.0 beta has known issues with ACSS stylesheet enqueuing in Gutenberg. There's no need to report Gutenberg styling issues. These are work-in-progress releases.

</details>

## 0.26.0 · June 24, 2025 {#0-26-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto-author components as synced patterns in Gutenberg

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Components now render properly in GB

- <span className="badge changelog-badge changelog-badge--breaking">Breaking</span> Read Upgrade Notes!

<details>
<summary>Release notes</summary>

Components are now auto-block-authored to core synced patterns in Gutenberg. They will now render in GB and show up in the pattern library as synced patterns. Next step will be passing prop data through from Etch with a secondary step of passing the actual props inputs through to the end user in GB for client editing capability.

**Upgrade Note:** This update will temporarily break your components. To upgrade safely, open all pages/templates that contain a component and hit “Save” in Etch. This will upgrade your components to the new architecture. You shouldn’t need to do anything else.

</details>

## 0.25.0 · June 20, 2025 {#0-25-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> [Components] New Array Prop (MVP)

- <span className="badge changelog-badge changelog-badge--new">New</span> [Components] New Select Prop

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix HTML/CSS full screen cursor/typing issue

- <span className="badge changelog-badge changelog-badge--new">New</span> Fix HTML/CSS full screen modal lag

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix an issue with code highlighting

<details>
<summary>Release notes</summary>

Big milestone release! This is very much a work-in-progress release. One major new feature barely escaped getting included. Details in the community.

</details>

## 0.24.1 · June 17, 2025 {#0-24-1}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Reload template editor without being forced to leave template editor

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Save component without being forced to leave component editor

<details>
<summary>Release notes</summary>

Improved two big UX annoyances and squashed some bugs.

</details>

## 0.24.0 · June 12, 2025 {#0-24-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Generate random classes and IDs with .rand and #rand

- <span className="badge changelog-badge changelog-badge--new">New</span> Add "Launch Etch" button to wp-admin bar in backend

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve collapsing and expanding of elements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve delay on full screen dialogs

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve parsing in HTML editor

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add background color behind canvas to improve responsive mode

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve SVG color stripping

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve list reset styles

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent unwanted component edit across app

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Firefox not tracking styles correctly

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various bug fixes and improvements

<details>
<summary>Release notes</summary>

Back from WCEU! This was a short week after we took a few extra days off to recover from traveling, but we’ve still managed to put together some nice improvements for you.

</details>

## 0.23.0 · May 30, 2025 {#0-23-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Full screen mode for HTML, CSS, JS panels

- <span className="badge changelog-badge changelog-badge--new">New</span> Refactored Loop Architecture

- <span className="badge changelog-badge changelog-badge--new">New</span> Custom JSON Loops

- <span className="badge changelog-badge changelog-badge--new">New</span> Nested Loops

- <span className="badge changelog-badge changelog-badge--new">New</span> Loop Through ACF Repeater Fields

- <span className="badge changelog-badge changelog-badge--new">New</span> Completely Refactored Selector System

- <span className="badge changelog-badge changelog-badge--new">New</span> Official Support for Element Selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Official Support for Complex Selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Official Support for Combinator Selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Official Support for Attribute Selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Official Support for Pseudo Selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Official Support for Compound Selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto Suggest Classes in HTML Editor

- <span className="badge changelog-badge changelog-badge--new">New</span> Emmett Support in HTML Editor

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto Structure Panel Labeling From BEM Detection

- <span className="badge changelog-badge changelog-badge--new">New</span> Variable Manager V1 (Basic)

- <span className="badge changelog-badge changelog-badge--new">New</span> Variable Collections

- <span className="badge changelog-badge changelog-badge--new">New</span> "Convert to List" Feature in Structure Panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve parsing of self closing elements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved HTML error handling

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix disappearing nested components

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various Fixes for Selector System

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix CMD + D in Code Editors

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various Gutenberg Related Fixes

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent Unwanted Navigation When Renaming Props

<details>
<summary>Release notes</summary>

Big update! We’re now one step away from having everything we need to release the new EtchWP website built with Etch itself.

</details>

## 0.22.0 · May 22, 2025 {#0-22-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Element-Level Custom Javascript Authoring

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> "Hide Element on Canvas" now stores and retains the show/hide state

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> More improvements to panel minimizing

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix empty div default styling selector

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix missing style badges above css editor

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix dragging into drawer when drawer is empty

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent auto badge scroll on collapsed elements

<details>
<summary>Release notes</summary>

Bring sites to life with advanced interactivity via element-level custom Javascript! Whether you're writing it yourself or having your favorite LLM author it, you can now create dynamic elements like accordions, carousels, sliders, triggers, menus, and more without waiting for premade versions of these elements to arrive. And since your custom JS lives with the elements it belongs to, full shareability and importing/exporting of patterns and components will be available in the future without anything breaking.

</details>

## 0.21.1 · May 16, 2025 {#0-21-1}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve remove button on class badges to prevent accidental clicks

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Disable structure panel dropzones for direct children of svg

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Ensure unformatted text while pasting into contenteditable elements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Handle '.' in frontend dynamic parsing

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Further improve UX for slot handling

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Automatically add slots during component creation

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove duplicate content input form properties panel

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix issues in ArrowKey behavior being prevented on shortcut collisions

<details>
<summary>Release notes</summary>

Some cleanup and fixes that are ready to go and don’t need to wait for next week’s sprint.

</details>

## 0.21.0 · May 15, 2025 {#0-21-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Style Manager: Selector Manager (Alpha)

- <span className="badge changelog-badge changelog-badge--new">New</span> Panel Visibility Controls

- <span className="badge changelog-badge changelog-badge--new">New</span> Paragraphs now fully support span tags

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various efficiency and architectural improvements

## 0.20.1 · May 14, 2025 {#0-20-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix an issue with keyboard shortcuts getting stuck on Mac

## 0.20.0 · May 14, 2025 {#0-20-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> New Element: SVG

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data: Content key (item.content)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Templates: Create Archive if Registered

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Allow ":" in attribute names

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Small improvement to dragging in structure panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Shortcut for creating/editing component

  OPTION + CMD + K on Mac or CNTRL + ALT + K on windows. Will be user editable in future.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix loss of default etch styles (Flex Div / Container) in components

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix etch-global-script object output on frontend even when user not logged in

<details>
<summary>Release notes</summary>

More goodies. You can expect another release tomorrow as well.

</details>

## 0.19.2 · May 9, 2025 {#0-19-2}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix a recursion issue in the new GB block parsing refactoring causing a front-end performance issue

<details>
<summary>Release notes</summary>

Special thanks to customer Jan Pulpan for their detailed bug report that helped us track down the issue that this release fixes.

</details>

## 0.19.1 · May 9, 2025 {#0-19-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix for dynamic data parsing in links nested in headings

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Small UI fix for long list of saved looped items

## 0.19.0 · May 8, 2025 {#0-19-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Official preliminary ACF support for dynamic data

- <span className="badge changelog-badge changelog-badge--new">New</span> Add &amp; Style Indirect &amp; Complex Selectors (Hover, Pseudo, Combinators, etc.)

- <span className="badge changelog-badge changelog-badge--new">New</span> New Element: iFrame

- <span className="badge changelog-badge changelog-badge--new">New</span> iFrame: Automatically Pull YouTube Attributes

- <span className="badge changelog-badge changelog-badge--new">New</span> .format() function for date formatting in dynamic data (php date formatting)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve Component Editing UX/UI

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix Gutenberg stripping slashes from content

- <span className="badge changelog-badge changelog-badge--breaking">Breaking</span> Gutenberg parsing refactor (Read Notes!)

  We have completely refactored the parsing for Gutenberg blocks to remove various limitations. This can break certain types of links and images, especially if images were put into figure tags. Please check existing links and images – broken instances can be fixed by replacing the broken instance with a new instance.

<details>
<summary>Release notes</summary>

This is a very exciting and feature-packed update, but also one that contains a breaking change so please read the changelog thoroughly before updating any existing projects you may have been working on.

</details>

## 0.18.0 · May 2, 2025 {#0-18-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch filter for adding custom global styles from php

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various internal/architecture improvements.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Treat dashes as non word character during selection handling

  You can now select dashed parts of a string in the code editors instead of being forced to select the entire string.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Save open component instance on page save

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Prevent accidental element deletion on label rename in structure panel

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix load order of etchGlobal

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix the template load that could return null

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Prevent license activation when it's already activated

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove the \_load_textdomain_just_in_time alert

<details>
<summary>Release notes</summary>

We dedicated this sprint to some cleanup work and to do some discovery for the next sprint.

</details>

## 0.17.1 · April 25, 2025 {#0-17-1}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix styling issues when Gutenberg loads in a non-iframed version

  Depending on what plugins you use, Gutenberg can load its preview in an iframe, or in the same DOM as the editor itself. This causes a lot of headaches to get the two versions to apply styling correctly. This release addresses some of those issues.

<details>
<summary>Release notes</summary>

A quick patch that addresses some styling issues in Gutenberg.

</details>

## 0.17.0 · April 24, 2025 {#0-17-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> License activation and validation

- <span className="badge changelog-badge changelog-badge--new">New</span> Template Manager (Alpha)

<details>
<summary>Release notes</summary>

Big milestone! Etch can now be installed, licensed, and validated. Oh, and you create and edit templates, free from the oppression of magic areas.

</details>

## 0.16.0 · April 18, 2025 {#0-16-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Templates: Dynamic Data Support

  You can now use dynamic data via `{this.}` keys in templates.

- <span className="badge changelog-badge changelog-badge--new">New</span> Expanded Block/Structure Parsing

  Not all HTML structures gracefully map to Gutenberg, so we've expanded Etch's parsing capabilities to handle previously unsupported HTML structures.

- <span className="badge changelog-badge changelog-badge--new">New</span> 3rd Party Block Passthrough Support

  Third party Gutenberg blocks no longer break Etch. They pass through in the form of a placeholder and render correctly on the front-end while retaining their exact specified behavior in Gutenberg.

- <span className="badge changelog-badge changelog-badge--new">New</span> License Key Activation

  Users can enter license keys via the license key input in wp-admin (temporary) or via the site's `wpconfig` file.

<details>
<summary>Release notes</summary>

The first step in the process of distributing installable files is now complete. We’re aiming to release installable files to customers the week of April 21st.

</details>

## 0.15.0 · April 10, 2025 {#0-15-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Vertical Settings Bar

- <span className="badge changelog-badge changelog-badge--new">New</span> Templates V1

- <span className="badge changelog-badge changelog-badge--new">New</span> Components: Slots

- <span className="badge changelog-badge changelog-badge--new">New</span> Components: Convert to Ghost Wrapper Architecture

- <span className="badge changelog-badge changelog-badge--new">New</span> Elements: Slot

- <span className="badge changelog-badge changelog-badge--new">New</span> Hide Interface Icon

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improve App Layout Structure

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> General UI Improvements

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various Bug Fixes

<details>
<summary>Release notes</summary>

Etch now does templating and components go Super Sayian level with “slots.”

</details>

## 0.13.0 · March 29, 2025 {#0-13-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> New “Edit in Etch” button in block editor

- <span className="badge changelog-badge changelog-badge--new">New</span> New “Edit in Etch” button in admin bar

- <span className="badge changelog-badge changelog-badge--new">New</span> Expand/Collapse all button for structure panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Removed .wp-site-blocks wrapper from front-end

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Change “add attribute” shortcut to CMD + Enter

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Move Add Attribute “Etch Bar” to dialog

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Native Etch trigger for ACSS dashboard

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Permanently unfold the Add Elements panel

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> CSS Inputs: UI update

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: API Level 1

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Navigation

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Add more inputs

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Show inherited values as placeholders

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Clone type (multi-category fields)

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Collision Warning System

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Conditional Logic

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs: Combobox input component

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Loop Panel: Unified UI

- <span className="badge changelog-badge changelog-badge--new">New</span> Conditions: “If” Element

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Conditions: Render booleans as “true”/”false” when used for value output

- <span className="badge changelog-badge changelog-badge--new">New</span> Conditions: Expose input field for condition expression

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX: Auto select Container when adding Section

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX: Expand ancestors in structure panel when selecting children on canvas

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Stop Breadcrumbs from collapsing on smaller screens

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Prevent element deletion when pressing SHIFT + DELETE in text fields

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto-BEM Level 1

- <span className="badge changelog-badge changelog-badge--new">New</span> File Upload Level 1

- <span className="badge changelog-badge changelog-badge--new">New</span> Add SVG Support &amp; Sanitation

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Elements: Change “Block” to “Flex Div”

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Elements: New Icons for Section, Container, Flex Div

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Save Button: Fix layout shift and add save animation

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various UI Improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved Image Handling in Gutenberg

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Base Block Theme Level 1

<details>
<summary>Release notes</summary>

A major update focused on quality of life features and enhancements and creating a more seamless development experience.

</details>

## 0.12.0 · March 21, 2025 {#0-12-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Class renaming v1

- <span className="badge changelog-badge changelog-badge--new">New</span> Class deletion v1

- <span className="badge changelog-badge changelog-badge--new">New</span> Loop deletion v1

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Add pseudo element support to custom CSS

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Ensure empty classes aren't output to stylesheet

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Always add sections as siblings

- <span className="badge changelog-badge changelog-badge--new">New</span> Autocompletion v1

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various fixes

<details>
<summary>Release notes</summary>

Lots of improvement type things.

</details>

## 0.11.1 · March 21, 2025 {#0-11-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> wp-cli commands

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UI Tweaks

<details>
<summary>Release notes</summary>

Nothing crazy in this one. Mostly UI tweaks, internal stuff, and some bug fixes.

</details>

## 0.11.0 · March 19, 2025 {#0-11-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs API

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Inputs Cat Navigation

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto var() expansion

- <span className="badge changelog-badge changelog-badge--new">New</span> Auto calc() expansion

- <span className="badge changelog-badge changelog-badge--new">New</span> Recipe Expansion

- <span className="badge changelog-badge changelog-badge--new">New</span> New CSS Inputs

- <span className="badge changelog-badge changelog-badge--new">New</span> Basic Responsive Preview Controls

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Auto Block Authoring Improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Default panel behavior improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Dozens of UI improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Basic Loop UI/UX Improvements

<details>
<summary>Release notes</summary>

Lots of UI/UX updates, 1-1 auto block authoring improvements, CSS input navigation, breakpoint previews, and more!

</details>

## 0.10.1 · March 14, 2025 {#0-10-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Inline component editing

  Complete elimination of all magic areas for components. Any component instance can now enable inline edit mode so you are free to edit your component instantly, in the context in which it actually lives.

- <span className="badge changelog-badge changelog-badge--new">New</span> Canvas-Enabled Property Mapping for Component Props

  Users can now map component props to elements on the canvas using a new "target element" feature. Activate targeting on a prop, click the element you want to map the prop to, and you're done. No more typing prop keys.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed an issue with text editing on canvas

<details>
<summary>Release notes</summary>

Quite possibly the most important component update since the birth of components in Etch.

</details>

## 0.10.0 · March 13, 2025 {#0-10-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Major UI Updates (Partial)

  - Full width Etch bar
  - Color updates
  - Redesigned structure panel
  - Contrast improvements
  - And more

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Editor / Inputs Triple Action Toggle Switch

  You can now choose to see CSS only, inputs only, or a split view for styling.

- <span className="badge changelog-badge changelog-badge--new">New</span> Component Props Preview Mode

  You can now preview any component prop or all component props when building components. This allows you to instantly flip back and forth between seeing prop keys and real values.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various improvements

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various fixes

<details>
<summary>Release notes</summary>

Etch gets its first major facelift. Things are starting to feel mighty cohesive and quick.

</details>

## 0.9 · March 6, 2025 {#0-9}

- <span className="badge changelog-badge changelog-badge--new">New</span> Components: Boolean Prop Switch

- <span className="badge changelog-badge changelog-badge--new">New</span> Conditions: Boolean Logic

- <span className="badge changelog-badge changelog-badge--new">New</span> Conditions: Support for logic operators >, >=, \<=, ==, truthy, falsy

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Styling Inputs: Proof of Concept

- <span className="badge changelog-badge changelog-badge--new">New</span> CSS Styling Inputs: Bi-Directional Sync Proof of Concept

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Enhancements &amp; Fixes for Compound Conditions

<details>
<summary>Release notes</summary>

Etch now has the most powerful component and conditions engine of any currently known tool for WordPress … and quite a lovely start to CSS styling inputs with a powerful trick up their sleeve (we’re going to make CSS styling inputs great again!).

</details>

## 0.8.1 · February 20, 2025 {#0-8-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Right click menu

  A right click menu for interacting with elements (e.g. duplicate, delete, create component, etc.)

- <span className="badge changelog-badge changelog-badge--new">New</span> Components UI &amp; CRUD

  UI for creating components, creating custom properties, deleting properties, and setting default values.

- <span className="badge changelog-badge changelog-badge--new">New</span> Properties Panel

  A panel dedicated to element properties for updating values.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various minor UI tweaks

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various minor fixes

<details>
<summary>Release notes</summary>

Etch now has a lightning fast UX/UI for creating components, creating/removing custom properties, assigning default property values, and assigning general property values at the element level.

</details>

## 0.8.0 · February 13, 2025 {#0-8-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Components v1

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> CSS Editor Placeholder

  A placeholder for when an element has no selectors - the CSS panel no longer disappears.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Cache-bust stylesheets on save

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> General refactorings and bug fixes

<details>
<summary>Release notes</summary>

**v1 of components is here!** There’s no UI for it yet, but the functionality is bundled and working as demonstrated in my update video in the private community.

</details>

## 0.7.0 · January 30, 2025 {#0-7-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> iFrame canvas

- <span className="badge changelog-badge changelog-badge--new">New</span> iFrame hook for 3rd party developers

  3rd party devs can now hook into the builder and iframe separately.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix bug with single button handling

  Dual and combo buttons worked, but single buttons had an issue. This is now fixed.

<details>
<summary>Release notes</summary>

Etch gets an iFrame canvas, opening a lot of future doors. Next sprint will start our components sprint.

</details>

## 0.6.0 · January 23, 2025 {#0-6-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> New Element: Div

  Clean, unopinionated div.

- <span className="badge changelog-badge changelog-badge--new">New</span> All panels are now resizable

  HTML, CSS, and Structure panels are now resizable, regardless of their location (Etch Bar vs Sidebar).

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Custom code editor fold icon

  We replaced the ugly default CodeMirror fold icon with a custom icon.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Change canvas dead zone pattern

  The dead zone is now a light stripe pattern that's much easier on the eye.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Reduce font size of structure panel

  You can now see much more of the structure panel due to a reduction in font-size and padding. There are many more improvements coming to the structure panel over the coming week or two that are already designed in Figma.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Move element styling defaults from Etch default classes to attributes

  Builders tend to add default classes to elements and assign builder defaults to these classes. Instead of doing this, we're using custom attributes to identify etch elements and applying the default styles to these attributes. This will clean up the classes area and ensure that the only classes on elements are ones added by the user as well as making it easier for us to handle element mutations.

  Additionally, we've ensured that all default styles are applied with :where() to reduce their specificity to 0.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Gutenberg rendering improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> PHP Refactoring

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Make Etch Bar full width

  The Etch Bar now spans the full width of the canvas to maximize real estate.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Update selector badge styling

  Selector badges were changed from tab-style to pill-style.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Font size adjustments and standardization

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UX/UI: Improve builder outline styles on hover &amp; drop zones

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> General code cleanup &amp; refactoring

  A ton of technical stuff has been improved that you don't really need to know about.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Restore keyboard shortcuts for duplicate, delete, save

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Remove unwanted duplicate cursor on HTMl attribute click

<details>
<summary>Release notes</summary>

A lot of back-end refactoring and many UX/UI improvements are at the heart of the 0.6 Etch release as we prepare to explore the addition of component functionality.

</details>

## 0.5.0 · December 19, 2024 {#0-5-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Drag to reposition elements on canvas

- <span className="badge changelog-badge changelog-badge--new">New</span> Modular UI: Sidebar drop zones for UI segments

- <span className="badge changelog-badge changelog-badge--new">New</span> Modular UI: Etch Bar drop zone for UI segments

- <span className="badge changelog-badge changelog-badge--new">New</span> Modular UI: Save Latest UI Preference to Database

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UI Updates

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Dozens of various fixes

<details>
<summary>Release notes</summary>

Etch is now … modular!

</details>

## 0.4.0 · December 5, 2024 {#0-4-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Structure Panel

  See the page structure, label elements, drag and drop to move and nest, and single click to select.

- <span className="badge changelog-badge changelog-badge--new">New</span> Sync Etch Structure Panel With Gutenberg Structure Panel

  Labels added in the Etch structure panel automatically label the Gutenberg structure panel.

- <span className="badge changelog-badge changelog-badge--new">New</span> Inline Text Editing on Canvas

  All content on the canvas is now freely editable.

- <span className="badge changelog-badge changelog-badge--new">New</span> Query Editor

  Edit/add/remove query loop attributes.

- <span className="badge changelog-badge changelog-badge--new">New</span> Name &amp; Save Custom Loop Queries

  Name and save custom query loop parameters for later use and easy access.

<details>
<summary>Release notes</summary>

A structure panel arrives to make navigating the canvas easier, the query loop gets more superpowers, and you can now edit content inline on the canvas!

</details>

## 0.3.0 · November 22, 2024 {#0-3-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Full support for HTML editing

  You can now freely edit HTML.

- <span className="badge changelog-badge changelog-badge--new">New</span> Query Loop

  Adds a query loop element with support for custom queries and instant preview.

- <span className="badge changelog-badge changelog-badge--new">New</span> Dynamic Data Support

  Dynamic data tags for displaying data dynamically from the database.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> UI/UX Improvements

<details>
<summary>Release notes</summary>

In a major new development, users can now freely edit HTML instead of being limited to editing attributes and content and now have access to a powerful query loop with dynamic data support.

</details>

## 0.2.1.2 · October 31, 2024 {#0-2-1-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> You can now add and style IDs on elements

  You can now add an ID to any element via the add attributes workflow and styles can be attached to the ID.

- <span className="badge changelog-badge changelog-badge--new">New</span> New tab-styled selectors UI with delete button

  We've changed to a top-aligned, tab-style attributes area when viewing the attributes attached to an element. This saves space and makes it easier to see which selector you're styling.

- <span className="badge changelog-badge changelog-badge--new">New</span> Delete attributes and classes from etch input with "!" prefix.

  You can now delete attributes by rewriting the name of the attribute with "!" as a prefix.

- <span className="badge changelog-badge changelog-badge--new">New</span> Classes added to the block editor classes string will carry over into Etch

  Adding classes to an element in Gutenberg's native classes input will attach those classes to the element in Etch.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refactor attribute handling of EtchBlock to make it more robust

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fixed nested hover styles render bug

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix for keyboard navigation lost after simple attributes submit

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Updated spacing for drawer handler

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Re-enable core blocks.

  We can't remove these after all. We can only disable them if variants are available.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Fix for visual issues when hovering over selected block

<details>
<summary>Release notes</summary>

This is a small update as we’ve been heavily investigating and experimenting with how looping is going to work in Etch. More to come soon!

</details>

## 0.2.1 · October 25, 2024 {#0-2-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Insert element as child on ctrl/cmd + click (cmd to insert as child)

- <span className="badge changelog-badge changelog-badge--new">New</span> Element creation menu in EtchBar with flyout animation

- <span className="badge changelog-badge changelog-badge--new">New</span> Duplicate and Delete functionality for blocks

- <span className="badge changelog-badge changelog-badge--new">New</span> Create/update any attribute with values

- <span className="badge changelog-badge changelog-badge--new">New</span> Section, block and container variants with default classes

- <span className="badge changelog-badge changelog-badge--new">New</span> Support for custom dataset styling selectors

- <span className="badge changelog-badge changelog-badge--new">New</span> Integration with theme.json for basic reset of default core blocks

- <span className="badge changelog-badge changelog-badge--new">New</span> Basic reset of default core settings for etch variants

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved handling of WordPress core classes

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Refactored PHP components with improved structure

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Child management API on EtchBlock

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Complete frontend support for custom attributes

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Live preview for custom attributes selector-based styles

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Minimum height for etch container

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Select the last selectable style on attributes submit

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Updated drawer behavior with improved height management

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved block selection and hover highlighting

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved Codemirror scrollbar styles and behavior

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Better HTML formatting with Shift-Alt-f support

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Default styles now come from global styles with class-based approach

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Updated version of Render class with enhanced HTMLDomParser functionality

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Optimized attribute handling and processing

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved state management and UI updates

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various memory and performance optimizations

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Multiple stability and rendering improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various pipeline and build process improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Various CSS editor and class handling improvements

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Improved component rendering with updated version of Render class

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Resolved conflicts between default styling and custom attributes

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Various Codemirror-related fixes and performance improvements

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Custom attributes styling issues resolved

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> Double-dashed classes encoding error resolved

<details>
<summary>Release notes</summary>

Etch takes a MAJOR step forward this week as you can now add basic elements directly in Etch, add custom attributes, delete elements, and duplicate elements.

</details>

## 0.1.2 · October 17, 2024 {#0-1-2}

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Resizable Drawer

  You can now control the vertical height of the Etch drawer.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Command Click Class Without Cursor in Editor

  You previously had to have the cursor inside the editor in order to CMD click a class. Now the cursor position / focus doesn't matter.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Code is Folded by Default for Elements With Children

  The Etch Drawer doesn't fully open on initial click anymore. You only see all the code if you want to (via unfold). This saves a tremendous amount of screen real estate while ensuring that you can still see and interact with the most important stuff (selector and attributes).

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Styling Better Matches Mockup

  Cleaning things up.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Dummy Icon Functionality (Add Elements, etc.)

  Ignore these for now.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Edit in Gutenberg Icon/Action

  Easily go back to the block editor from Etch.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Bar: Front-End Preview Icon/Action

  Easily view the front-end from Etch.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Etch-Gutenberg Conversion Engine Refactoring

  We're finding better ways to do things from Etch to GB and back.

- <span className="badge changelog-badge changelog-badge--new">New</span> Gutenberg-Frontend Conversion Engine Refactoring

  We're finding better ways to do things from GB to frontend.

- <span className="badge changelog-badge changelog-badge--new">New</span> Basic Support for Buttons and Images

  Buttons and images are coming along.

- <span className="badge changelog-badge changelog-badge--new">New</span> Experimental Overwrites of Selective Core Styles

  Prepping for future stuff.

- <span className="badge changelog-badge changelog-badge--new">New</span> Basic Implementation of Removing Selective Core Block Controls

  Prepping for future stuff.

<details>
<summary>Release notes</summary>

The Etch Bar is growing up, but you should ignore style rendering issues in Gutenberg for this version.

</details>

## 0.1.1 · October 10, 2024 {#0-1-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> Line-wrapping in code editor

  Line-wrapping is now the default behavior in the code editor and we've added a new shortcut (OPT/ALT + Z) for toggling line-wrapping.

- <span className="badge changelog-badge changelog-badge--new">New</span> Etch Block API

- <span className="badge changelog-badge changelog-badge--new">New</span> EtchGlobal global variable object

- <span className="badge changelog-badge changelog-badge--new">New</span> Codemirror class API

- <span className="badge changelog-badge changelog-badge--new">New</span> Gutenberg nested core variants with custom logic (POC)

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> CMD + Click on class name in editor to add styles

  You can now directly edit styles for any class by holding CMD and clicking on the class name in the editor. **Note: For now, the cursor must already be focused in the editor for this to work.**

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Attribute input moved from separate bar into Etch bar

  We've removed the separate add attributes bar and put this functionality directly into the Etch bar. This allows you to maintain proper context and view of the selected element's code while you're adding attributes.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> Render PHP class for parsing Gutenberg blocks on frontend

<details>
<summary>Release notes</summary>

Most of the work we did this week was back-end stuff, but there are a few new UX enhancements as well as the start of Etch Block Variations in Gutenberg.

</details>

## 0.1.0 · October 7, 2024 {#0-1-0}

- <span className="badge changelog-badge changelog-badge--new">New</span> Editor Environment &amp; Canvas

- <span className="badge changelog-badge changelog-badge--new">New</span> Save Etch work to database

- <span className="badge changelog-badge changelog-badge--new">New</span> Render website with the block editor's rendering engine

- <span className="badge changelog-badge changelog-badge--new">New</span> "Etch Bar" V1

- <span className="badge changelog-badge changelog-badge--new">New</span> Block authoring for group, paragraph, and heading blocks

- <span className="badge changelog-badge changelog-badge--new">New</span> Expose HTML for selected element

- <span className="badge changelog-badge changelog-badge--new">New</span> Add selectors to elements &amp; author CSS

<details>
<summary>Release notes</summary>

This is the initial version to kick off the MVP phase. Pretty exciting! We’ll be rolling out a steady stream of incremental releases to build upon this version.

</details>

## 0.0.1 · September 6, 2024 {#0-0-1}

- <span className="badge changelog-badge changelog-badge--new">New</span> 1508 Early Adopter Licenses Sold

- <span className="badge changelog-badge changelog-badge--new">New</span> Private Etch community established

<details>
<summary>Release notes</summary>

This is a placeholder entry to signify the beginning of active development post-launch. In 72 hours, 1508 early adopters bought into the Etch project and effectively green-lit full time development.

</details>
