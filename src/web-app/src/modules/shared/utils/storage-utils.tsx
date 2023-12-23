import { useEffect } from 'react';

export function setLocalStorageItem(key: string, value: any): void {
    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value]);
}

export function getLocalStorageItem(key: string, defaultValue: string = ''): string {
    const item = localStorage.getItem(key);
    return item !== null ? item : defaultValue;
}
