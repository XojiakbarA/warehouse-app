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
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';
import {Link, useLocation} from "react-router-dom";

const list1 = [
    { id: 1, title: "Dashboard", path: "/", icon: <DashboardIcon/> },
    { id: 2, title: "Settings", path: "/settings", icon: <SettingsIcon/>},
]
const list2 = [
    { id: 1, title: "Warehouses", path: "/warehouses", icon: <WarehouseIcon/> },
    { id: 2, title: "Categories", path: "/categories", icon: <CategoryIcon/>},
    { id: 3, title: "Suppliers", path: "/suppliers", icon: <GroupIcon/> },
    { id: 4, title: "Clients", path: "/clients", icon: <GroupIcon/> },
    { id: 5, title: "Products", path: "/products", icon: <ShoppingCartIcon/> },
    { id: 6, title: "Inputs", path: "/inputs", icon: <DownloadIcon/> },
    { id: 7, title: "Outputs", path: "/outputs", icon: <UploadIcon/> },
    { id: 8, title: "Users", path: "/users", icon: <PersonIcon/> },
]
const MainDrawer = ({ open, onDrawerClose }) => {

    const location = useLocation()

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
                    {
                        list1.map(i => (
                            <ListItem disablePadding key={i.id}>
                                <ListItemButton component={Link} to={i.path}>
                                    <ListItemIcon>
                                        {i.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={i.title}/>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider/>
                <List>
                {
                    list2.map(i => (
                        <ListItem key={i.id} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={i.path}
                                selected={location.pathname === i.path}
                            >
                                <ListItemIcon>
                                    {i.icon}
                                </ListItemIcon>
                                <ListItemText primary={i.title}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
                </List>
            </Box>
        </Drawer>
    )
}

export default MainDrawer