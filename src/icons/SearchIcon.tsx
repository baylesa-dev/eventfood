import React, { ReactElement } from 'react';

import { get } from 'lodash';

import theme from 'theme';

import type { IconProps } from './types';
import getSizes from './utils/getSizes';

export default function SearchIcon({
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
            <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
        </svg>
    );
}
