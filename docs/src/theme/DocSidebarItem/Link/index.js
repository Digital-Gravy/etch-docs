import React from 'react';
import OriginalLink from '@theme-original/DocSidebarItem/Link';
import { getBadgeClass } from '../badgeUtils';

export default function Link(props) {
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

  return <OriginalLink {...props} item={newItem} />;
}
