import { type DefaultTheme } from 'styled-components';

export enum ThemeType {
    Dark,
    Light,
}

const darkTheme: DefaultTheme = {
    type: ThemeType.Dark,
    textColor: 'rgba(255, 255, 255, 0.92)',
    content: {
        background: '#242424',
    },
    menu: {
        background: '#313131',
        link: {
            active: {
                background: '#525bd6',
                color: 'inherit',
            },
            hover: {
                background: '#3b3b3b',
            },
        },
        detailedButtonColor: 'inherit',
    },
    header: {
        background: '#272727',
    },
    footer: {
        background: '#2b2b2b',
    },
    button: {
        contained: {
            primary: '#525bd6',
        },
        outlined: {
            primary: '#8890ff',
        },
        text: {
            primary: '#8890ff',
        },
    },
    textField: {
        legend: {
            color: '#FFFFFF90;',
        },
        outlined: {
            primary: '#9a9fe7',
            outline: '#ffffff50',
            hover: {
                outline: '#ffffffbb',
            },
        },
    },
    select: {
        outlined: {
            primary: '#9a9fe7',
            outline: '#ffffff50',
            hover: {
                outline: '#ffffffbb',
            },
            option: {
                color: '#ffffff',
                backgroundColor: '#242424',
                hoverBackgroundColor: '#3b3b3b',
                selectedBackgroundColor: '#525bd6',
            },
        },
        filled: {
            primary: '#9a9fe7',
            option: {
                color: '#ffffff',
                backgroundColor: '#242424',
                hoverBackgroundColor: '#3b3b3b',
                selectedBackgroundColor: '#525bd6',
            },
        },
        standard: {
            primary: '#9a9fe7',
            option: {
                color: '#ffffff',
                backgroundColor: '#242424',
                hoverBackgroundColor: '#3b3b3b',
                selectedBackgroundColor: '#525bd6',
            },
        },
    },
    paginate: {
        arrow: {
            primary: '#e4e4e4',
            reachEnd: '#3f3f3f',
        },
    },
};

const lightTheme: DefaultTheme = {
    type: ThemeType.Light,
    textColor: 'rgba(0, 0, 0, 0.92)',
    content: {
        background: '#f7f7f7',
    },
    menu: {
        background: '#ffffff',
        link: {
            active: {
                background: '#525bd6',
                color: 'rgba(255, 255, 255, 0.92)',
            },
            hover: {
                background: '#E5E5E5',
            },
        },
        detailedButtonColor: '#131e28',
    },
    header: {
        background: '#f9f9f9',
    },
    footer: {
        background: '#f9f9f9',
    },
    button: {
        contained: {
            primary: '#3a43c0',
        },
        outlined: {
            primary: '#3a43c0',
        },
        text: {
            primary: '#3a43c0;',
        },
    },
    textField: {
        legend: {
            color: '#00000090;',
        },
        outlined: {
            primary: '#4955ff',
            outline: '#00000050',
            hover: {
                outline: '#000000bb',
            },
        },
    },
    select: {
        outlined: {
            primary: '#3a43c0',
            outline: '#00000050',
            hover: {
                outline: '#00000050',
            },
            option: {
                color: '#000000',
                backgroundColor: '#ffffff',
                hoverBackgroundColor: '#E5E5E5',
                selectedBackgroundColor: '#525bd6',
            },
        },
        filled: {
            primary: '#3a43c0',
            option: {
                color: '#000000',
                backgroundColor: '#ffffff',
                hoverBackgroundColor: '#E5E5E5',
                selectedBackgroundColor: '#525bd6',
            },
        },
        standard: {
            primary: '#3a43c0',
            option: {
                color: '#000000',
                backgroundColor: '#ffffff',
                hoverBackgroundColor: '#E5E5E5',
                selectedBackgroundColor: '#525bd6',
            },
        },
    },
    paginate: {
        arrow: {
            primary: '#131313',
            reachEnd: '#bbbbbb',
        },
    },
};

export function getTheme(theme: ThemeType): DefaultTheme {
    switch (theme) {
        case ThemeType.Dark:
            return darkTheme;
        case ThemeType.Light:
            return lightTheme;
    }
}

export function getThemeType(theme: number): ThemeType {
    switch (theme) {
        case ThemeType.Dark:
            return ThemeType.Dark;
        case ThemeType.Light:
            return ThemeType.Light;
        default:
            return ThemeType.Dark;
    }
}
