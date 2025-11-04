export function isSubtleBadge(badge) {
  if (!badge || typeof badge !== 'string') return false;
  const val = badge.toLowerCase();
  return val === 'planned' || val === 'wip' || val === 'doc wip';
}

export function getBadgeClass(badge) {
  return isSubtleBadge(badge)
    ? 'menu__link-badge menu__link-badge--subtle'
    : 'menu__link-badge';
}
