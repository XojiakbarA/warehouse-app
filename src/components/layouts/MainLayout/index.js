import MainAppBar from "./MainAppBar";
import MainDrawer from "./MainDrawer";
import {Container, Toolbar} from "@mui/material";
import {Outlet} from "react-router";
import {useState} from "react";

const MainLayout = () => {

    const [open, setOpen] = useState(false)

    const toggleDrawer = (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return
        }
        setOpen(open => !open)
    }


    return (
        <>
            <MainAppBar onMenuIconClick={toggleDrawer}/>
            <MainDrawer open={open} onDrawerClose={toggleDrawer}/>
            <Toolbar/>
            <Container maxWidth={"xl"}>
                <Outlet/>
            </Container>
            <Toolbar/>
        </>
    )
}

export default MainLayout