import React, { FC } from 'react';
// @ts-ignore

/**
 * Ссылка на сторибук компонента.
 */
export const StorybookLink: FC<{ link?: string }> = ({ link }) => {
    if (!link) {
        return null;
    }
    return (
        <a href={link} target="_blank" rel="noreferrer" style={{ position: 'absolute', top: 0, right: 0 }}>
            Storybook
        </a>
    );
};
