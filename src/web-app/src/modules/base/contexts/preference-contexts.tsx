import { createContext } from 'react';
import { getThemeType } from '../../shared/theme/ThemeOptions';
import { getLocalStorageItem } from '../../shared/utils/storage-utils';

const prefersTheme = getLocalStorageItem('prefersTheme');
const themeNumber = parseInt(prefersTheme);
const themeType = getThemeType(themeNumber);

export const AppThemeContext = createContext({
    theme: themeType,
    changeTheme: () => {},
});
