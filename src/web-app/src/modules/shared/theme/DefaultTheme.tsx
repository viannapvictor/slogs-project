import { type ThemeType } from './ThemeOptions';

interface SelectOption {
    color: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    selectedBackgroundColor: string;
}

declare module 'styled-components' {
    export interface DefaultTheme {
        type: ThemeType;
        textColor: string;
        content: {
            background: string;
        };
        menu: {
            background: string;
            link: {
                active: {
                    background: string;
                    color: string;
                };
                hover: {
                    background: string;
                };
            };
            detailedButtonColor: string;
        };
        header: {
            background: string;
        };
        footer: {
            background: string;
        };
        button: {
            contained: {
                primary: string;
            };
            outlined: {
                primary: string;
            };
            text: {
                primary: string;
            };
        };
        textField: {
            legend: {
                color: string;
            };
            outlined: {
                primary: string;
                outline: string;
                hover: {
                    outline: string;
                };
            };
        };
        select: {
            outlined: {
                primary: string;
                outline: string;
                hover: {
                    outline: string;
                };
                option: SelectOption;
            };
            filled: {
                primary: string;
                option: SelectOption;
            };
            standard: {
                primary: string;
                option: SelectOption;
            };
        };
        paginate: {
            arrow: {
                primary: string;
                reachEnd: string;
            };
        };
    }
}
