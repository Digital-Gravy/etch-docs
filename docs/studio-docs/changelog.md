---
title: Changelog
sidebar_position: 402
---

# Changelog

Every change shipped to Etch Studio, newest first.

## November 11, 2026 {#2026-11-11}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Visible quick notes**

  Quick Notes stay in view when you hover over an element that extends beyond the canvas.

- <span className="badge changelog-badge changelog-badge--new">New</span> **View as client**

  Preview the builder as a client to see their editing experience, then switch back to your admin view.

## November 10, 2026 {#2026-11-10}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Better guidance for AI agents**

  Agents connected through the AI Connector now learn how to build pages the Etch way before they start: sections and containers, dynamic images, styles, components and SEO. They also get a clear error instead of silently changing nothing when they misspell a setting.

- <span className="badge changelog-badge changelog-badge--new">New</span> **BEM class names for agents**

  Choose in Settings → AI whether agents name classes the BEM way. It is on by default, and always on while Automatic.css is enabled.

## November 5, 2026 {#2026-11-05}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Clearer component highlights for clients**

  Hovering inside a component highlights the component instead of its individual elements.

- <span className="badge changelog-badge changelog-badge--new">New</span> **See who else is editing**

  The action bar warns you when someone else, or another of your tabs, has the website open.

## November 4, 2026 {#2026-11-04}

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Reordering inside components**

  While you edit a component, its elements are no longer locked in place in the Structure panel, so you can drag them into a new order again.

## November 3, 2026 {#2026-11-03}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Field presets and copy & paste**

  Add a ready-made set of fields, copy fields from one content type to another, or delete all fields at once, from the ··· menu next to the content type name in the Content Hub's Fields view.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Lighter content queries**

  Pass omit to queryContent() in a JavaScript data source to leave parts of each item out, linked items included. For example, omit: ['content'] skips page content, so a menu or listing that only needs titles and slugs loads far less.

## November 2, 2026 {#2026-11-02}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Deploy through the AI Connector**

  Agents connected through the AI Connector can now deploy your site to Cloudflare.

## October 29, 2026 {#2026-10-29}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Fallbacks in expressions**

  Use ?? or || in a dynamic expression to fall back to another value when the first is empty, for example \{this.fields.metaTitle || this.title\}.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Social image from a URL or expression**

  A route's social image can now be a URL or a dynamic expression, as well as an image from the media library.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **camelCase field keys**

  New Content Hub fields get camelCase keys, like heroImage, so they read cleanly in dynamic expressions. Field keys can no longer contain hyphens.

## October 28, 2026 {#2026-10-28}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Client editing**

  Invite clients to edit page text and links, replace images and SVG icons, update component properties, and manage Content Hub items. Clients can publish changes while design and code controls stay out of their way.

  [Share feedback on Quackback](https://digitalgravy.quackback.io/)

- <span className="badge changelog-badge changelog-badge--new">New</span> **SEO through the AI Connector**

  Agents connected through the AI Connector can now read and set each route's SEO, from title and description to social image, search visibility and redirects, and check the result for every page at once.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Page titles for new routes**

  A new route under the site root starts with a title that puts each page's own title in front of the site's, instead of naming every page after the site.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Steadier canvas scrolling**

  Clicking a block on the canvas no longer scrolls the page, and selecting a block in a loop scrolls to its nearest copy.

## October 27, 2026 {#2026-10-27}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **The Content Hub now has multiple views**

  The Content Hub now offers three views for editing content: popover, drawer, and fullscreen. Switch between them as you work, and the Content Hub remembers your preferred preview view.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Routes from data sources**

  Add a data source to a dynamic route to publish a page for each item it returns. Template previews and the search preview use those items too.

  [Documentation](https://docs.etchwp.com/studio/routing#pages-from-a-data-source)

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Editing link text**

  Clicking into a link's text now keeps it editable instead of dropping out on the first click.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **One outline at a time**

  The canvas now outlines only the block under your pointer, and the parts of a component no longer look separately selectable.

## October 26, 2026 {#2026-10-26}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **SEO length guidance**

  Title and description fields show a length bar and warn when the text is longer than search results display, counted on the text your page will actually show.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Smoother client editing**

  The client editing popover now stays inside the window, closes when you click elsewhere on the page, and shows a component's settings when you edit something inside it.

## October 25, 2026 {#2026-10-25}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Refreshed icons**

  Image, duplicate and edit icons were redrawn, and Content Hub item actions use them in a clearer order.

## October 24, 2026 {#2026-10-24}

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Clearer builder sidebar**

  The sidebar has its own Builder button and shows more clearly which area is open and which ones you can't use.

## October 23, 2026 {#2026-10-23}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Clients can edit images**

  Clients can replace an image and its alt text right on the page.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Clients can manage content**

  Clients can create and edit Content Hub items, while content types stay with the rest of the team.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Jump to content from the command palette**

  Search content types and items from the command palette and open them directly.

## October 22, 2026 {#2026-10-22}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Invite members**

  Invite people to your workspace from the Members page.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Client role**

  Give someone the Client role so they can edit and publish content without code, design, structure or settings controls getting in the way.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Unread updates indicator**

  A dot on the What's new button shows when there are changes you haven't seen yet.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Clearer error messages**

  When settings fail to save, or your role doesn't allow an action, the message now tells you why.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Safer file uploads**

  Uploaded files that aren't images, video, audio or PDF are downloaded instead of opened in the browser.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Redirects on published sites**

  Redirects now take effect on the published site.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Asset name conflicts**

  Renaming or replacing an asset with a name that's already taken now shows an error instead of breaking the asset.

## October 21, 2026 {#2026-10-21}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Redirects per route**

  Send a route's visitors to another address with the status you choose, from the new Redirects & Errors tab. Redirects are published with the site.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Error page per route**

  Any route can now set its own 404 page. Routes without one show which page they inherit.

- <span className="badge changelog-badge changelog-badge--new">New</span> **What's new**

  Open the changelog from the dashboard sidebar or from the builder.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Automatic canonical URL**

  The canonical URL field has an automatic mode that fills it in for you.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **SEO panel tabs**

  The SEO panel is organized in tabs, and search visibility is picked with a single segmented choice.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Steady search preview**

  The search preview no longer jumps around while it loads.

## October 20, 2026 {#2026-10-20}

- <span className="badge changelog-badge changelog-badge--new">New</span> **Multiple workspaces**

  Belong to more than one workspace and switch between them. Etch Studio opens the last one you used.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Member roles and access**

  Change a member's role and choose which websites they can reach from the Members page.

- <span className="badge changelog-badge changelog-badge--new">New</span> **Canonical URL per route**

  A route can set its own canonical URL for its pages.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **SEO Essentials panel**

  The SEO panel was redesigned and simplified.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Settings apply right away**

  The site reloads with the new values as soon as you save.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Cloudflare connection**

  Connecting Cloudflare now links it to the correct workspace.

- <span className="badge changelog-badge changelog-badge--improved">Improved</span> **Removing members**

  Removing someone from a workspace no longer deletes their account.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Failed saves are reported**

  A save or delete that fails now shows an error instead of looking like it succeeded.

- <span className="badge changelog-badge changelog-badge--fixed">Fixed</span> **Canonical URLs with special characters**

  Canonical URLs that contain special characters are now escaped correctly.
