import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import Logo from '@theme/Logo';
import clsx from 'clsx';

const products = [
	{ label: 'Etch WP', shortLabel: 'WP', home: '/' },
	{ label: 'Etch Studio', shortLabel: 'Studio', home: '/studio' }
];

// Opens on click rather than hover, so it also works on touch screens.
function ProductSwitcher({ activeProduct }) {
	const [isOpen, setIsOpen] = useState(false);
	const switcherRef = useRef(null);
	const toggleRef = useRef(null);
	const menuId = useId();

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const closeOnOutsideInteraction = (event) => {
			if (!switcherRef.current?.contains(event.target)) {
				setIsOpen(false);
			}
		};
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
				toggleRef.current?.focus();
			}
		};

		document.addEventListener('pointerdown', closeOnOutsideInteraction);
		document.addEventListener('focusin', closeOnOutsideInteraction);
		document.addEventListener('keydown', closeOnEscape);
		return () => {
			document.removeEventListener('pointerdown', closeOnOutsideInteraction);
			document.removeEventListener('focusin', closeOnOutsideInteraction);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [isOpen]);

	return (
		<div ref={switcherRef} className={clsx('dropdown', 'product-switcher', { 'dropdown--show': isOpen })}>
			<button
				ref={toggleRef}
				type="button"
				className="product-switcher-toggle"
				aria-expanded={isOpen}
				aria-controls={menuId}
				aria-label={`Documentation: ${activeProduct.label}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{activeProduct.shortLabel}
			</button>
			<ul id={menuId} className="dropdown__menu">
				{products.map((product) => (
					<li key={product.home}>
						<Link
							to={product.home}
							className={clsx('dropdown__link', { 'dropdown__link--active': product === activeProduct })}
							aria-current={product === activeProduct ? 'true' : undefined}
							onClick={() => setIsOpen(false)}
						>
							{product.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

// Etch WP and Etch Studio are separate products sharing one docs site: show which one is active,
// let readers switch, and keep the logo link inside the docs they're in.
export default function NavbarLogo() {
	const { pathname } = useLocation();
	const isStudio = pathname === '/studio' || pathname.startsWith('/studio/');
	const activeProduct = isStudio ? products[1] : products[0];

	return (
		<>
			<Logo
				className="navbar__brand"
				imageClassName="navbar__logo"
				titleClassName="navbar__title text--truncate"
				to={activeProduct.home}
			/>
			<ProductSwitcher activeProduct={activeProduct} />
		</>
	);
}
