import React from 'react';
import OriginalCategory from '@theme-original/DocSidebarItem/Category';

export default function Category(props) {
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

  return <OriginalCategory {...props} item={newItem} />;
}
