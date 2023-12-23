import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Stack from "../modules/shared/components/Stack";

describe ('Stack', () => {
    it('Check Stack props', () => {
        cleanup();
        render(<Stack />);
        const div = screen.getByTestId("stack-component");
        expect(div.nodeName).toBe("DIV");
        
        cleanup();
        render(<Stack component="button" />);
        const button = screen.getByTestId("stack-component");
        expect(button.nodeName).toBe("BUTTON");

    })
})