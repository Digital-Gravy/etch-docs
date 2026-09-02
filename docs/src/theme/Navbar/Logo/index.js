import React from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavbarLogo from '@theme-original/Navbar/Logo';

/**
 * Etch WP and Etch Studio are separate products sharing one docs site, and the
 * Studio instance is reachable by direct URL only. Without a marker the two are
 * indistinguishable on screen, so tag the brand while inside `/studio`.
 *
 * The "Studio" text is a placeholder until a dedicated Studio logo exists.
 */
export default function NavbarLogo(props) {
	const { pathname } = useLocation();
	const isStudio = pathname === '/studio' || pathname.startsWith('/studio/');

	if (!isStudio) {
		return <OriginalNavbarLogo {...props} />;
	}

	return (
		<>
			<OriginalNavbarLogo {...props} />
			<span className="navbar__product-tag">Studio</span>
		</>
	);
}
