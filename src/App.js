import {CssBaseline, ThemeProvider, useTheme} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";

function App() {

    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>

                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App
