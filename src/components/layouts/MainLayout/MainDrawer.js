import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import {Link} from "react-router-dom";

const MainDrawer = ({ open, onDrawerClose }) => {

    return (
        <Drawer
            open={open}
            onClose={onDrawerClose}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={onDrawerClose}
                onKeyDown={onDrawerClose}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={"/"}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={"/warehouses"}>
                            <ListItemIcon>
                                <WarehouseIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Warehouses"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default MainDrawer