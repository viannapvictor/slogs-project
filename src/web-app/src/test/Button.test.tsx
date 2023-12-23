import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import Button from "../modules/shared/components/Button";
import { ThemeProvider } from 'styled-components';
import { ThemeType, getTheme } from '../modules/shared/theme/ThemeOptions';

describe ('Button', () => {
    it('Call onClick button', () => {
        cleanup();
        
        const onClick = jest.fn()
        render(
            <ThemeProvider theme={getTheme(ThemeType.Dark)}>
                <Button onClick={onClick} />
            </ThemeProvider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onClick).toBeCalled();
    })
})