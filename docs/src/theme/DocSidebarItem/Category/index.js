import React from 'react';
import OriginalCategory from '@theme-original/DocSidebarItem/Category';
import { getBadgeClass } from '../badgeUtils';

export default function Category(props) {
  const { item } = props;
  const badge = item?.customProps?.badge;
  const badgeClass = getBadgeClass(badge);

  const newItem = badge
    ? {
        ...item,
        label: (
          <>
            {item.label}
            <span className={badgeClass}>{badge}</span>
          </>
        ),
      }
    : item;

  return <OriginalCategory {...props} item={newItem} />;
}
