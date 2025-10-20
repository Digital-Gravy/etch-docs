import React from 'react';
import OriginalLink from '@theme-original/DocSidebarItem/Link';

export default function Link(props) {
  const { item } = props;
  const badge = item?.customProps?.badge;

  const newItem = badge
    ? {
        ...item,
        label: (
          <>
            {item.label}
            <span className="menu__link-badge">{badge}</span>
          </>
        ),
      }
    : item;

  return <OriginalLink {...props} item={newItem} />;
}
