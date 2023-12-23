import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import Paginate from "../modules/shared/components/Paginate";
import { ThemeProvider } from "styled-components";
import { ThemeType, getTheme } from "../modules/shared/theme/ThemeOptions";

describe ('Paginate', () => {
    it('Test Paginate buttons and page state', () => {
        cleanup();
        let expectedPage = 1;

        render(
            <ThemeProvider theme={getTheme(ThemeType.Dark)}>
                <Paginate pageCount={8} onPageChange={(newPage) => expect(newPage).toBe(expectedPage)} />
            </ThemeProvider>
            
        );

        const rightButton = screen.getByTestId("page-button-right");
        const leftButton = screen.getByTestId("page-button-left");
        
        for (; expectedPage < 7; expectedPage++) {
            fireEvent.click(rightButton);
        }
        fireEvent.click(rightButton); // Esperado ativar o onPageChange
        fireEvent.click(rightButton); // Não é esperado o onPageChange

        expectedPage--

        for (; expectedPage > 0; expectedPage--) {
            fireEvent.click(leftButton);
        }
        fireEvent.click(leftButton); // Esperado ativar o onPageChange
        fireEvent.click(leftButton); // Não é esperado o onPageChange
    })
})