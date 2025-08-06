---
title: Basic Nav
---

# Basic Nav

:::note
The current implementation of the Basic Nav element is a temporary implementation designed to get a working navigation in the hands of users as quickly as possible. In the future, the Basic Nav will be an insertable element via the Elements bar with no need to manually copy and paste code, create a component, etc.
:::

## Implementation Overview

:::warning
Make sure you're using at least Etch 0.33.1 and read the note above before you continue.
:::

This guide will walk you through adding a Basic, accessible Nav component to your site with full support for dropdown menus and flyout menus.

The Nav component consists of four parts:
1. HTML
2. CSS
3. JS
4. JSON

The Burger Trigger (for mobile menu) consists of 3 parts:
1. HTML
2. CSS
3. JS

Here are the steps we'll walkthrough to setup your nav:
1. Add the Nav HTML to your header
2. Attach the Nav CSS
3. Attach the Nav JS
4. Convert to component
5. Select the proper Loop
6. Add the Trigger

## Preparing Your Header

The main navigation for your site should live in a header component. Heres how you can quickly create a Header component that will accept your Nav component:

1. **Edit the Index/Catch All template.** Navigate to this template via the Template Hub and click edit.
2. **Create a header.** Add a section element and change the HTML tag to `<header>`.
3. **Convert your header to a component.** Right click the header and click "create component."
4. **Add a slot in the Header inner Container.** From within the component editor, click the Inner Container in the header and then click the Slot element icon in the bottom element panel to add a slot. Name the Slot, "Right." This will be the slot for the right side of your header. Don't worry about positioning it or styling it yet.
5. **Save and close.** You can now exit the component editor.

## Adding the Basic Nav

1. Add a Flex Div in the slot we created in the header.
2. Copy this Nav HTML:

```HTML
<nav
	aria-label="{props.navAriaLabel}"
	data-etch-nav="main"
	aria-expanded="false"
	class="etch-nav"
	data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwic3RydWN0dXJlU3RhdGUiOiJvcGVuIiwicmVmIjoiZXB1cTlmNyJ9"
>
	<ul
		aria-label="{props.navAriaLabel}"
		class="etch-nav__list"
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwic3RydWN0dXJlU3RhdGUiOiJvcGVuIiwicmVmIjoidHk3MWozeCJ9"
	>
		{#loop props.basicNav as item
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiZnMxaGw1ZSJ9"}
		{#if !item.children
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiZ2ZvczExbSJ9"}
		<li
			class="etch-nav__item"
			data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiOWhlNDBudyJ9"
		>
			<a
				href="{item.url}"
				class="etch-nav__link"
				data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiaWNxMWFvYSJ9"
				>{item.label}</a
			>
		</li>
		{/if} {#if item.children
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiNWdqZmQyZCJ9"}
		<li
			class="etch-nav__item etch-nav__item--has-dropdown"
			data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiMHJvejgxeiJ9"
		>
			<button
				aria-label="open {item.label} navigation"
				aria-haspopup="true"
				aria-expanded="false"
				class="etch-nav__button etch-nav__button--dropdown-toggle"
				data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoicTdibGVydCJ9"
			>
				<span
					data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiYWsyeTN4OSJ9"
					>{item.label}</span
				>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoic2lmM3RjMiJ9"
				>
					<path
						fill="currentColor"
						d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71L8.46 9.17a1 1 0 0 0-1.41 0a1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42"
						data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoidTd5emowdyJ9"
					></path>
				</svg>
			</button>
			<ul
				aria-label="{item.label} navigation"
				class="etch-nav__dropdown"
				data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiOWpla2dzYyJ9"
			>
				{#loop item.children as dropdownItem
				data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoieHNrajNkYiJ9"}
				{#if !dropdownItem.children
				data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiZzhpNHpvYiJ9"}
				<li
					class="etch-nav__item"
					data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoibTl3bmg3ZyJ9"
				>
					<a
						href="{dropdownItem.url}"
						class="etch-nav__link"
						data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoieDRwcjV0byJ9"
						>{dropdownItem.label}</a
					>
				</li>
				{/if} {#if dropdownItem.children
				data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiNzBtajBqayJ9"}
				<li
					class="etch-nav__item etch-nav__item--has-flyout"
					data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiOGhwMDE1MSJ9"
				>
					<button
						aria-label="open {dropdownItem.label} navigation"
						aria-haspopup="true"
						aria-expanded="false"
						class="etch-nav__button etch-nav__button--flyout-toggle"
						data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoidDhwbGtobiJ9"
					>
						<span
							data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoieHRqdXBtYyJ9"
							>{dropdownItem.label}</span
						>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoidW5jdzYxdSJ9"
						>
							<path
								fill="currentColor"
								d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71L8.46 9.17a1 1 0 0 0-1.41 0a1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42"
								data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoidnhzcHpqNiJ9"
							></path>
						</svg>
					</button>
					<ul
						aria-label="{dropdownItem.label} navigation"
						class="etch-nav__flyout"
						data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoicGZvNmJleSJ9"
					>
						{#loop dropdownItem.children as flyoutItem
						data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiaDl4czlnbSJ9"}
						<li
							class="etch-nav__item"
							data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiamtnamlieiJ9"
						>
							<a
								href="{flyoutItem.url}"
								class="etch-nav__link"
								data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiN3c3MmNmeiJ9"
								>{flyoutItem.label}</a
							>
						</li>
						{/loop}
					</ul>
				</li>
				{/if} {/loop}
			</ul>
		</li>
		{/if} {/loop}
	</ul>
</nav>
```
3. Replace the flex div with the Nav HTML from your clipboard.
4. Select the Nav element in the structure panel. It will already have the `.etch-nav` class attached to it. Paste the CSS below into the `.etch-nav` class.
```css
/* Nav */
	--nav-background-color: #transparent;
	--nav-mobile-background-color: #fff;
	--nav-foreground-color: #000;

	/* Nav List */
	--nav-list-style: none;
	--nav-list-padding: 0;
	--nav-list-margin: 0;

	/* Nav Items */
	--nav-item-block-padding: 0.5rem;
	--nav-item-inline-padding: 1rem;
	--nav-item-padding: var(--nav-item-block-padding)
		var(--nav-item-inline-padding);
	--nav-item-focus-line: 2px;
	--nav-item-focus-outline-color: var(--nav-foreground-color);
	--transition-duration: 0.3s;
	--transition-timing-function: ease-in-out;
	--nav-item-icon-rotation: 180deg;

	/* Nav Button Icons */
	--nav-button-icon-size: 20px;

	/* Nav Links */
	--nav-link-padding: 0.5em 1em;
	--nav-link-color: var(--nav-foreground-color);
	--nav-link-color-contrast: var(--nav-background-color);
	--nav-link-color-hover: var(--primary, #444);
	--nav-link-background-hover: transparent;

	/* Nav Dropdowns and flyouts */
	--nav-dropdown-background: #fff;
	--nav-flyout-background: #fff;
	--nav-flyout-icon-desktop-initial-angle: -90deg;
	--nav-flyout-icon-desktop-rotation: 90deg;

	/* Set header to relative */
	header:has(&) {
		position: relative;
	}

	background-color: var(--nav-background-color);
	display: none;

	&[aria-expanded='true'] {
		--nav-background-color: var(--nav-mobile-background-color);
		display: flex;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
	}

	:where(.etch-nav__list) {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: var(--nav-list-margin);
		padding: var(--nav-list-padding);
		list-style: var(--nav-list-style);
	}

	:where(.etch-nav__list, .etch-nav__dropdown, .etch-nav__flyout) {
		margin: var(--nav-list-margin);
		padding: var(--nav-list-padding);
		list-style: var(--nav-list-style);
	}

	:where(.etch-nav__item) {
		display: flex;
		flex-direction: column;
	}

	:where(
		.etch-nav__link:focus,
		.etch-nav__link:focus-visible,
		.etch-nav__button:focus,
		.etch-nav__button:focus-visible
	) {
		outline: var(--nav-item-focus-line) solid
			var(--nav-item-focus-outline-color);
	}

	:where(.etch-nav__item .etch-nav__link, .etch-nav__item .etch-nav__button) {
		text-decoration: none;
		color: var(--nav-link-color);
		padding: var(--nav-item-padding);
	}

	:where(.etch-nav__button) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--nav-link-color);

		svg {
			width: var(--nav-button-icon-size);
			min-width: var(
				--nav-button-icon-size
			); /* There seems to be some issue with etch.reset and max-width 100%*/
			height: var(--nav-button-icon-size);
			transition: transform var(--transition-duration)
				var(--transition-timing-function);
		}
	}

	:where(
		.etch-nav__button--dropdown-toggle[aria-expanded='true'] svg,
		.etch-nav__button--flyout-toggle[aria-expanded='true'] svg
	) {
		transform: rotate(var(--nav-item-icon-rotation));
	}

	:where(
		.etch-nav__item:hover > .etch-nav__link,
		.etch-nav__item:hover > .etch-nav__button[aria-expanded='true']
	) {
		color: var(--nav-link-color-hover);
		background-color: var(--nav-link-background-hover);
	}

	:where(.etch-nav__item--has-dropdown, .etch-nav__item--has-flyout) {
		position: relative;
	}

	:where(.etch-nav__dropdown) {
		position: relative;
		background-color: var(--nav-dropdown-background);
		transition:
			max-height calc(var(--transition-duration) / 2)
				var(--transition-timing-function),
			opacity var(--transition-duration) var(--transition-timing-function),
			visibility var(--transition-duration)
				var(--transition-timing-function);
	}

	:where(
		.etch-nav__button--dropdown-toggle[aria-expanded='false']
			~ .etch-nav__dropdown,
		.etch-nav__button--flyout-toggle[aria-expanded='false']
			~ .etch-nav__flyout
	) {
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		transition:
			max-height var(--transition-duration)
				var(--transition-timing-function),
			opacity var(--transition-duration) var(--transition-timing-function),
			visibility var(--transition-duration)
				var(--transition-timing-function);
	}

	:where(.etch-nav__flyout) {
		background-color: var(--nav-flyout-background);
		transition:
			max-height calc(var(--transition-duration) / 2)
				var(--transition-timing-function),
			opacity var(--transition-duration) var(--transition-timing-function),
			visibility var(--transition-duration)
				var(--transition-timing-function);
	}

	@media (min-width: 768px) {
		display: flex;

		:where(.etch-nav__item) {
			text-wrap: nowrap;
		}

		:where(.etch-nav__list) {
			flex-direction: row;
		}

		:where(.etch-nav__button:nth-child(2)) {
			padding-inline: 0 var(--nav-item-horizontal-padding);
		}

		:where(.etch-nav__dropdown) {
			position: absolute;
			top: 100%;
			left: 0;
			overflow: inherit;
			max-height: 0; /* desktop flicker fix */
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		}

		:where(.etch-nav__button--flyout-toggle svg) {
			transform: rotate(var(--nav-flyout-icon-desktop-initial-angle));
		}

		:where(.etch-nav__button--flyout-toggle[aria-expanded='true'] svg) {
			transform: rotate(var(--nav-flyout-icon-desktop-rotation));
		}

		:where(.etch-nav__flyout) {
			position: absolute;
			top: 0;
			left: 100%;
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		}
	}
```
5. With the main Nav element still selected, copy the below JS and paste it into the JS editor. If you don't see the JS editor in Etch, make sure the JS panel is turned on in the panel visibility area.
```js
class EtchNavScript {
	constructor(navElement) {
		this.navEl = navElement;
		this.hoverTimeouts = new Map();
		this.isTouchDevice = this.detectTouchDevice();
		this.init();
	}

	detectTouchDevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}

	init() {
		if (!this.navEl) return console.error('Cannot find Nav element');

		this.navList = this.getNavList();
		this.topLevelNavItems = this.getTopLevelNavItems(this.navList);
		this.setTabIndex(this.topLevelNavItems);

		[this.dropdownButtons, this.flyoutButtons] = this.getButtons(
			this.navList
		);
		[this.dropdownNav, this.flyoutNav] = this.getAreaNav(this.navList);

		this.setButtonNavMap();
		this.buildFocusMaps();

		this.attachEventListeners();
		this.setInitialNavStates();
	}

	getNavList() {
		return this.navEl.querySelector('.etch-nav__list');
	}

	getTopLevelNavItems(navList) {
		return Array.from(navList.children).flatMap((li) =>
			Array.from(li.children).filter(
				(el) =>
					el.classList.contains('etch-nav__link') ||
					el.classList.contains('etch-nav__button')
			)
		);
	}

	getButtons(navList) {
		return [
			Array.from(
				navList.querySelectorAll('.etch-nav__button--dropdown-toggle')
			),
			Array.from(
				navList.querySelectorAll('.etch-nav__button--flyout-toggle')
			)
		];
	}

	getAreaNav(navList) {
		return [
			Array.from(navList.querySelectorAll('.etch-nav__dropdown')),
			Array.from(navList.querySelectorAll('.etch-nav__flyout'))
		];
	}

	getFocusableAreaElements(areaNav) {
		return Array.from(areaNav.children).flatMap((li) =>
			Array.from(
				li.querySelectorAll(
					':scope > a, :scope > button, :scope > [tabindex]:not([tabindex="-1"])'
				)
			)
		);
	}

	getOpenFlyoutsInDropdown(dropdown) {
		const flyouts = dropdown.querySelectorAll('.etch-nav__flyout');
		return Array.from(flyouts).filter((flyout) => {
			const button = this.areaTriggerMap.get(flyout);
			return button?.getAttribute('aria-expanded') === 'true';
		});
	}

	getOpenNavFromButton(button) {
		const nav = this.buttonNavMap.get(button);
		const isOpen = button.getAttribute('aria-expanded') === 'true';
		return isOpen ? nav : null;
	}

	getContextForTarget(target) {
		const area = this.elementAreaMap.get(target);
		if (!area) {
			return {
				type: 'top-level',
				items: this.topLevelNavItems,
				area: null
			};
		}
		const items = this.areaFocusMap.get(area);
		const type = area.classList.contains('etch-nav__flyout')
			? 'flyout'
			: 'dropdown';
		return { type, items, area };
	}

	getParentDropdown(element) {
		let parent = element.parentElement;
		while (parent) {
			if (parent.classList.contains('etch-nav__dropdown')) return parent;
			parent = parent.parentElement;
		}
		return null;
	}

	setTabIndex(items) {
		items.forEach((el) => el.setAttribute('tabindex', '0'));
	}

	setButtonNavMap() {
		this.buttonNavMap = new Map();

		this.dropdownButtons?.forEach((button) => {
			const li = button.closest('li');
			const dropdown = this.dropdownNav.find(
				(m) => m.closest('li') === li
			);
			if (dropdown) this.buttonNavMap.set(button, dropdown);
		});

		this.flyoutButtons?.forEach((button) => {
			const li = button.closest('li');
			const flyout = this.flyoutNav.find((m) => m.closest('li') === li);
			if (flyout) this.buttonNavMap.set(button, flyout);
		});
	}

	setAreaNavState(button, open) {
		const nav = this.buttonNavMap.get(button);
		if (!nav) return;

		button.setAttribute('aria-expanded', String(open));

		if (open) {
			this.setExpandedNavHeight(nav);
		} else {
			this.setCollapsedNavHeight(nav);

			if (nav.classList.contains('etch-nav__dropdown')) {
				const openFlyouts = this.getOpenFlyoutsInDropdown(nav);
				for (const flyout of openFlyouts) {
					const flyoutButton = this.areaTriggerMap.get(flyout);
					flyoutButton?.setAttribute('aria-expanded', 'false');
				}
			}
		}

		if (nav.classList.contains('etch-nav__flyout')) {
			this.calculateDropdownExtraHeight(nav);
		}
	}

	setInitialNavStates() {
		for (const [button] of this.buttonNavMap.entries()) {
			const isOpen = button.getAttribute('aria-expanded') === 'true';
			this.setAreaNavState(button, isOpen);
		}
	}

	setExpandedNavHeight(nav) {
		const height = this.calculateNavHeight(nav);
		nav.style.maxHeight = '0px';
		nav.offsetHeight; // force reflow
		nav.style.maxHeight = `${height}px`;
	}

	setCollapsedNavHeight(nav) {
		nav.style.maxHeight = `${nav.scrollHeight}px`;
		nav.offsetHeight; // force reflow
		nav.style.maxHeight = '0px';
	}

	buildFocusMaps() {
		this.areaFocusMap = new Map();
		this.areaTriggerMap = new Map();
		this.elementAreaMap = new Map();

		for (const el of this.topLevelNavItems) {
			this.elementAreaMap.set(el, undefined);
		}

		[...this.dropdownNav, ...this.flyoutNav].forEach((nav) => {
			const button = [...this.buttonNavMap.entries()].find(
				([, m]) => m === nav
			)?.[0];
			if (!button) return;

			const items = this.getFocusableAreaElements(nav);

			this.areaFocusMap.set(nav, items);
			this.areaTriggerMap.set(nav, button);

			for (const item of items) {
				this.elementAreaMap.set(item, nav);
			}
		});
	}

	calculateNavHeight(nav) {
		if (nav.classList.contains('etch-nav__flyout')) {
			return nav.scrollHeight;
		}

		const dropdownMaxHeight = nav.style.maxHeight;
		nav.style.maxHeight = 'none';
		let totalHeight = nav.scrollHeight;
		nav.style.maxHeight = dropdownMaxHeight;

		const openFlyouts = this.getOpenFlyoutsInDropdown(nav);
		for (const flyout of openFlyouts) {
			totalHeight += flyout.scrollHeight;
		}

		return totalHeight;
	}

	// This method matches the dropdown height when a flyout is opened
	calculateDropdownExtraHeight(flyout) {
		const parentDropdown = this.getParentDropdown(flyout);
		if (!parentDropdown) return;

		const button = this.areaTriggerMap.get(parentDropdown);
		if (button?.getAttribute('aria-expanded') === 'true') {
			const height = this.calculateNavHeight(parentDropdown);
			parentDropdown.style.maxHeight = `${height}px`;
		}
	}

	toggleAreaNav(button) {
		this.clearHoverTimeout(button);

		const isOpen = button.getAttribute('aria-expanded') === 'true';
		this.setAreaNavState(button, !isOpen);
		if (!isOpen) this.closeSiblingNav(button);
	}

	closeSiblingNav(currentButton) {
		for (const [button] of this.buttonNavMap.entries()) {
			if (
				button !== currentButton &&
				button.closest('ul') === currentButton.closest('ul') &&
				button.getAttribute('aria-expanded') === 'true'
			) {
				this.setAreaNavState(button, false);
			}
		}
	}

	closeAllNavs() {
		for (const [button] of this.buttonNavMap.entries()) {
			this.setAreaNavState(button, false);
		}
	}

	closeNavAndReturnFocus(area) {
		const button = this.areaTriggerMap.get(area);
		if (button) {
			this.setAreaNavState(button, false);
			button.focus();
		}
	}

	focusFirstChildNavItemIfOpen(button) {
		const nav = this.getOpenNavFromButton(button);
		if (!nav) return { focused: false, type: null };

		const items = this.areaFocusMap.get(nav);
		if (items?.length) items[0].focus();

		const type = nav.classList.contains('etch-nav__flyout')
			? 'flyout'
			: 'dropdown';
		return { focused: true, type };
	}

	moveFocus(items, direction) {
		const active = document.activeElement;
		let index = items.indexOf(active);
		if (index === -1) index = 0;

		let next = index + direction;
		if (next >= items.length) next = 0;
		if (next < 0) next = items.length - 1;

		items[next]?.focus?.();
	}

	handleFocusIn(e) {
		const newlyFocusedElement = e.target;
		const isTopLevelItem =
			this.topLevelNavItems.includes(newlyFocusedElement);

		const isInOpenNav = [...this.buttonNavMap.entries()].some(
			([btn, nav]) => {
				const isButtonOpen =
					btn.getAttribute('aria-expanded') === 'true';
				const isWithinNav =
					nav.contains(newlyFocusedElement) ||
					btn === newlyFocusedElement;

				return isButtonOpen && isWithinNav;
			}
		);

		if (isTopLevelItem && !isInOpenNav) {
			this.closeAllNavs();
		}
	}

	attachEventListeners() {
		this.attachClickEventListeners();
		this.attachHoverEventListeners();

		this.navEl.addEventListener('keydown', (e) => this.handleKeyDown(e));
		this.navEl.addEventListener('focusin', (e) => this.handleFocusIn(e));
	}

	attachClickEventListeners() {
		[...this.dropdownButtons, ...this.flyoutButtons].forEach((btn) =>
			btn.addEventListener('click', () => this.toggleAreaNav(btn))
		);
	}

	attachHoverEventListeners() {
		if (this.isTouchDevice) return;

		[...this.dropdownButtons, ...this.flyoutButtons].forEach((button) => {
			const nav = this.buttonNavMap.get(button);
			if (!nav) return;

			const clear = () => this.clearHoverTimeout(button);
			const schedule = () => this.scheduleHoverTimeout(button, nav);

			button.addEventListener('mouseenter', () => {
				const isOpen = button.getAttribute('aria-expanded') === 'true';
				if (!isOpen) this.setAreaNavState(button, true);
			});

			button.addEventListener('mouseleave', schedule);
			nav.addEventListener('mouseleave', schedule);
			nav.addEventListener('mouseenter', clear);
		});
	}

	scheduleHoverTimeout(button, nav) {
		this.clearHoverTimeout(button);

		const timeout = setTimeout(() => {
			const isHovering =
				button.matches(':hover') ||
				nav.matches(':hover') ||
				nav.contains(document.querySelector(':hover'));

			if (!isHovering) this.setAreaNavState(button, false);
			this.hoverTimeouts.delete(button);
		}, 25);

		this.hoverTimeouts.set(button, timeout);
	}

	clearHoverTimeout(button) {
		if (this.hoverTimeouts.has(button)) {
			clearTimeout(this.hoverTimeouts.get(button));
			this.hoverTimeouts.delete(button);
		}
	}

	handleKeyDown(e) {
		const { key, target } = e;
		const { type, items, area } = this.getContextForTarget(target);

		switch (key) {
			case 'ArrowRight':
			case 'ArrowLeft':
			case 'ArrowUp':
			case 'ArrowDown':
				e.preventDefault();
				this.handleDirectionalArrow(key, type, items, target, area);
				break;
			case 'Tab':
				if (e.shiftKey && area && items.indexOf(target) === 0) {
					e.preventDefault();
					this.closeNavAndReturnFocus(area);
				}
				break;
			case 'Enter':
			case ' ':
				if (this.buttonNavMap.has(target)) {
					e.preventDefault();
					this.toggleAreaNav(target);
				}
				break;
		}
	}

	handleDirectionalArrow(key, type, items, target, area) {
		const index = items.indexOf(target);
		const isFirst = index === 0;

		switch (key) {
			case 'ArrowRight':
				if (type === 'top-level' || type === 'flyout') {
					this.moveFocus(items, 1);
				} else if (type === 'dropdown') {
					const { focused, type: nextType } =
						this.focusFirstChildNavItemIfOpen(target);
					if (!focused || nextType !== 'flyout')
						this.moveFocus(items, 1);
				}
				break;
			case 'ArrowLeft':
				if (type === 'top-level' || type === 'dropdown') {
					this.moveFocus(items, -1);
				} else if (type === 'flyout') {
					if (!isFirst) this.moveFocus(items, -1);
					else this.closeNavAndReturnFocus(area);
				}
				break;
			case 'ArrowUp':
				if (type === 'dropdown') {
					if (!isFirst) this.moveFocus(items, -1);
					else this.closeNavAndReturnFocus(area);
				} else if (type === 'flyout') {
					this.moveFocus(items, -1);
				}
				break;
			case 'ArrowDown':
				if (type === 'top-level') {
					this.focusFirstChildNavItemIfOpen(target);
				} else {
					this.moveFocus(items, 1);
				}
				break;
		}
	}
}

function instantiateNavClass() {
	// etch nav element ( if you changed the data-etch-nav attribute value in html, it need to be reflected here as well)
	const navEl = document.querySelector('[data-etch-nav="main"]');

	if (!navEl) {
		console.error(
			'Cannot find Nav element, is the [data-etch-nav=""] attribute correct?'
		);
		return;
	}

	// create an instance of the nav script
	const navInstance = new EtchNavScript(navEl);

	// use etchElements window object or create a new one if doesnt exist
	window.etchElements = window.etchElements || [];
	// create an instance of navInstance on the window
	window.etchElements.etchNav = navInstance;
}

instantiateNavClass();
```
6. Right click the Nav and choose "Create component."
7. From the component editor, add a "Loop" prop. Make sure the prop key is `basicNav`. The HTML is looking for this specific prop key.
8. Choose the Basic Nav loop as the default loop. This is a starter nav loop that is provided by default in Etch.
9. Save the component and exit the component editor.
10. Choose the Basic Nav loop once again from the Loop selector in the component attributes panel. This will explicitly set the loop so you're not relying on the default value.

You will now see a rendered sample navigation in your header.

## Adding the Burger Trigger

The burger trigger is required for triggering the mobile navigation.

1. Add a placeholder Flex Div to the Header slot after the the Nav component that you added in the Header slot.
2. Replace the Flex Div with the HTML code below:
```html
<button
	aria-expanded="false"
	class="etch-burger"
	data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwic3RydWN0dXJlU3RhdGUiOiJvcGVuIiwicmVmIjoiZWVoamd1ZSJ9"
>
	<span
		class="etch-burger__line"
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiN3JsZWZlMSJ9"
	></span
	><span
		class="etch-burger__line"
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoiNGw5MHk0MiJ9"
	></span
	><span
		class="etch-burger__line"
		data-etch-context="eyJvcmlnaW4iOiJldGNoIiwiaGlkZGVuIjpmYWxzZSwicmVmIjoibWl2NmVxbiJ9"
	></span>
</button>
```
3. Choose the Burger element and you'll see the `.etch-burger` class. Paste the following CSS into that class:
```css
.etch-burger {
	--hamburger-size: 20px;
	--burger-dark-color: #242424;
	--burger-lines-size: 100%;
	--transition-duration: 0.3s;
	--transition-timing-function: ease-in-out;

	inline-size: calc(var(--hamburger-size) + var(--hamburger-size) / 5);
	block-size: var(--hamburger-size);
	flex-direction: column;
	justify-content: space-between;
	padding: 0;
	cursor: pointer;

	display: flex;

	/* Hide Burger above X breakpoint */
	@media (min-width: 768px) {
		display: none;
	}

	span {
		display: flex;
		height: 2px;
		background: var(--burger-dark-color);
		min-height: 0;
		max-inline-size: var(--burger-lines-size);
		inline-size: var(--burger-lines-size);
		min-inline-size: 0;
		transition:
			transform var(--transition-duration)
				var(--transition-timing-function),
			opacity var(--transition-duration) var(--transition-timing-function),
			background var(--transition-duration)
				var(--transition-timing-function);
	}

	&[aria-expanded='true'] span:nth-child(1) {
		transform: translateY(9px) rotate(45deg);
	}

	&[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}

	&[aria-expanded='true'] span:nth-child(3) {
		transform: translateY(-9px) rotate(-45deg);
	}
}
```
4. With the Burger element still selected, paste in the following JS:
```js
class EtchBurgerScript {
	constructor(options = {}) {
		this.button = options.button;
		this.target = this.resolveTarget(options.target);
		this.selfAriaExpanded = options.selfAriaExpanded ?? false;

		const targetConfig = options.targetOptions ?? {};
		this.targetClass = targetConfig.class ?? null;
		this.targetAriaExpanded = targetConfig.ariaExpanded ?? false;

		this.onToggle =
			typeof options.onToggle === 'function' ? options.onToggle : null;
		this.onClose =
			typeof options.onClose === 'function' ? options.onClose : null;

		this.init();
	}

	init() {
		if (!this.button) return console.error('Cannot find Burger button');
		this.attachEventListeners();
	}

	isEtchEditor() {
		const isInEditor =
			window !== window.top && frameElement.id === 'etch-iframe';
		return isInEditor;
	}

	resolveTarget(target) {
		if (target == null) return null;

		if (this.isEtchEditor()) return null;

		if (typeof target === 'string') {
			const element = document.querySelector(target);
			if (!element) return console.error('Cannot find target element');
			return element;
		}

		if (target instanceof HTMLElement) return target;

		console.error(
			'Invalid target — must be a selector string or HTMLElement'
		);
		return null;
	}

	attachEventListeners() {
		this.button.addEventListener('click', () => this.handleClick());
	}

	handleClick() {
		const newState = this.getToggleState();
		this.updateBurgerState(newState);
		this.updateTargetState(newState);

		try {
			if (this.onToggle) this.onToggle(newState);
			if (!newState && this.onClose) this.onClose();
		} catch (error) {
			console.error('Error on callback:', error);
		}
	}

	getToggleState() {
		if (this.selfAriaExpanded) {
			const isOpen = this.button.getAttribute('aria-expanded') === 'true';
			return !isOpen;
		}

		return false;
	}

	updateBurgerState(newState) {
		if (this.selfAriaExpanded) {
			this.button.setAttribute('aria-expanded', String(newState));
		}
	}

	updateTargetState(newState) {
		if (this.target == null) return;
		if (!this.target) {
			console.error('Cannot find target element');
			return;
		}

		if (this.targetClass) {
			this.target.classList.toggle(this.targetClass, newState);
		}

		if (this.targetAriaExpanded) {
			this.target.setAttribute('aria-expanded', String(newState));
		}
	}
}

// etcNav parameter is not needed if the burger is not to work with the nav component
function instantiateBurgerClass(etchNav) {
	// get etch burger element
	const burgerBtn = document.querySelector('.etch-burger');
	// create etch burger instance with options
	const burgerInstance = new EtchBurgerScript({
		button: burgerBtn,
		target: etchNav,
		selfAriaExpanded: true,
		targetOptions: {
			ariaExpanded: true
		}
	});

	// use etchElements window object or create a new one if doesnt exist
	window.etchElements = window.etchElements || [];
	// create etch burger instance on the window
	window.etchElements.etchBurger = burgerInstance;
}

/**
 * Check if the nav element exists
 * If the burger is not to work with the nav component, then the block of code bellow can be removed
 */
const etchNav = document.querySelector('[data-etch-nav="main"]');
if (!etchNav) {
	console.error('Burger cannot find Nav element');
} else {
	instantiateBurgerClass(etchNav);
}

/**
 * If the burger is not to used with the nav component then the code bellow can be uncommented
 */
// instantiateBurgerClass();
```
5. Right click the Burger element and choose "Create Component."
6. Save the component and exit the component editor.

You now have a Burger element (which you can't see on desktop) next to a Navigation element. The navigation pulls data from the Basic Nav JSON data to compile your JSON into a functional, accessible, responsive menu.

## Configuring Your Navigation

You obviously don't want sample data in your Navigation, so let's customize it.

1. Open the Loop Manager.
2. Click on the Basic Nav loop.
3. Edit the JSON to configure your navigation.

:::tip
AI is extremely good at producing working JSON. If you don't like editing JSON manually, consider letting AI help you.
:::

Here's some sample JSON:

```json
[
  {
    "label": "Home",
    "url": "/"
  },
  {
    "label": "Item 2",
    "children": [
      {
        "label": "Item 2.1",
        "url": "/dropdown1"
      },
      {
        "label": "Item 2.2",
        "url": "/dropdown2",
        "children": [
          {
            "label": "Item 2.2.1",
            "url": "/dropdown1"
          },
          {
            "label": "Item 2.2.2",
            "url": "/dropdown2"
          },
          {
            "label": "Item 2.2.3",
            "url": "/dropdown3"
          }
        ]
      },
      {
        "label": "Item 2.3",
        "url": "/dropdown3"
      }
    ]
  },
  {
    "label": "Item 3",
    "url": "/page",
    "children": [
      {
        "label": "Item 3.1",
        "url": "/dropdown1"
      },
      {
        "label": "Item 3.2",
        "url": "/dropdown2"
      },
      {
        "label": "Item 3.3",
        "url": "/dropdown3"
      },
      {
        "label": "Item 3.4",
        "url": "/dropdown4"
      }
    ]
  },
  {
    "label": "Item 4",
    "url": "/about"
  },
  {
    "label": "Item 5",
    "url": "/contact-us"
  }
]
```
- Each label/url pair is a navigation link.
- The "children" object defines children for a navigation item. Children links will automatically be placed in a dropdown.
- If a child has children, this defines a grandchildren relationship. Grandchildren will automatically be placed in a flyout.

:::tip
Use relative URL references, not full static URLs.
:::

## Styling Your Navigation

Styling is currently done via locally scoped variables. You'll see these configured in the `.etch-nav` class. Just change the values of the tokens to style your menu. If there are any needs beyond what's provided, you'll need to write custom CSS for those. This will all be expanded and improved in the future.

## Changing the Mobile Breakpoint

The current collapse breakpoint is 768px. To change this, you'll need to edit:
1. `.etch-nav` - Line 140.
2. `.etch-burger` - line 18.

:::warning
The breakpoint values must be equal at all times. If you edit one, you must edit the other.
:::