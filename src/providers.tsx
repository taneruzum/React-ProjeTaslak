import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./lib/store/store";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};