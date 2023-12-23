import { ThemeType, getTheme, getThemeType } from '../../shared/theme/ThemeOptions';
import { getLocalStorageItem, setLocalStorageItem } from '../../shared/utils/storage-utils';
import { type DefaultTheme } from 'styled-components';
import { useState } from 'react';

export function useAppTheme(): [DefaultTheme, () => void] {
    const storedValue = getLocalStorageItem('prefersTheme');
    const themeNumber = parseInt(storedValue);

    const [theme, setTheme] = useState(getThemeType(themeNumber));
    setLocalStorageItem('prefersTheme', theme);

    const changeTheme = (): void => {
        if (theme === ThemeType.Dark) {
            setTheme(ThemeType.Light);
        } else {
            setTheme(ThemeType.Dark);
        }
    };
    return [getTheme(theme), changeTheme];
}

export function useSidebarDetailed(): [boolean, () => void] {
    const storedValue = getLocalStorageItem('prefersDetailedMenu');

    const [detailed, setDetailed] = useState(storedValue === 'true');
    setLocalStorageItem('prefersDetailedMenu', detailed);

    const changeDetailed = (): void => {
        setDetailed(!detailed);
    };
    return [detailed, changeDetailed];
}
