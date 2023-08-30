import {CssBaseline, ThemeProvider, useTheme} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Warehouses from "./pages/Warehouses";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import Suppliers from "./pages/Suppliers";
import Clients from "./pages/Clients";

function App() {

    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={"/warehouses"} element={<Warehouses/>}/>
                    <Route path={"/categories"} element={<Categories/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                    <Route path={"/suppliers"} element={<Suppliers/>}/>
                    <Route path={"/clients"} element={<Clients/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
