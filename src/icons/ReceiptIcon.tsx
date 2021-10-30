import React, { ReactElement } from 'react';

import { get } from 'lodash';

import theme from 'theme';

import type { IconProps } from './types';
import getSizes from './utils/getSizes';

export default function ReceiptIcon({
    color,
    size,
    ...otherProps
}: IconProps): ReactElement {
    const fillColor = color ? get(theme.colors, color) : undefined;
    const props = {
        fill: fillColor,
        ...getSizes(size),
        ...otherProps,
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path d="M16,0H8A5.006,5.006,0,0,0,3,5V23a1,1,0,0,0,1.564.825L6.67,22.386l2.106,1.439a1,1,0,0,0,1.13,0l2.1-1.439,2.1,1.439a1,1,0,0,0,1.131,0l2.1-1.438,2.1,1.437A1,1,0,0,0,21,23V5A5.006,5.006,0,0,0,16,0Zm3,21.1-1.1-.752a1,1,0,0,0-1.132,0l-2.1,1.439-2.1-1.439a1,1,0,0,0-1.131,0l-2.1,1.439-2.1-1.439a1,1,0,0,0-1.129,0L5,21.1V5A3,3,0,0,1,8,2h8a3,3,0,0,1,3,3Z" />
            <rect x="7" y="8" width="10" height="2" rx="1" />
            <rect x="7" y="12" width="8" height="2" rx="1" />
        </svg>
    );
}
