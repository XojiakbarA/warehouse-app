import {CssBaseline, ThemeProvider, useTheme} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Warehouses from "./pages/Warehouses";

function App() {

    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={"/warehouses"} element={<Warehouses/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
