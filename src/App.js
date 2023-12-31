import {CssBaseline, ThemeProvider, useTheme} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Warehouses from "./pages/Warehouses";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import Suppliers from "./pages/Suppliers";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Inputs from "./pages/Inputs";
import Input from "./pages/Input";
import Outputs from "./pages/Outputs";
import Output from "./pages/Output";
import Users from "./pages/Users";
import NearToExpireInputProducts from "./pages/NearToExpireInputProducts";

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
                    <Route path={"/products"} element={<Products/>}/>
                    <Route path={"/inputs"} element={<Inputs/>}/>
                    <Route path={"/inputs/:id/input-products"} element={<Input/>}/>
                    <Route path={"/outputs"} element={<Outputs/>}/>
                    <Route path={"/outputs/:id/output-products"} element={<Output/>}/>
                    <Route path={"/users"} element={<Users/>}/>
                    <Route path={"/near-to-expire/input-products"} element={<NearToExpireInputProducts/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
