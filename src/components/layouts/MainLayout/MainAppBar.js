import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useCallback, useEffect, useState} from "react";
import ListItem from "@mui/material/ListItem";
import {fetchUserNotifications} from "../../../api";
import {Badge} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

const MainAppBar = ({ onMenuIconClick }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [notAnchorEl, setNotAnchorEl] = useState(null)

    const [notifications, setNotifications] = useState([])

    const handleProfileOpen = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleNotificationOpen = (e) => {
        setNotAnchorEl(e.currentTarget)
    }
    const handleProfileClose = () => {
        setAnchorEl(null)
    }
    const handleNotificationClose = () => {
        setNotAnchorEl(null)
    }

    const getNotifications = useCallback(async () => {
        try {
            const res = await fetchUserNotifications()
            if (res.status === 200) {
                setNotifications(res.data.data)
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        getNotifications()
    }, [getNotifications])

    console.log(notifications)

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={onMenuIconClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Warehouse
                </Typography>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleProfileOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Badge badgeContent={notifications.length} color={"error"}>
                    <IconButton
                        aria-label="notifications"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleNotificationOpen}
                        color="inherit"
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Badge>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                >
                    <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                    <MenuItem onClick={handleProfileClose}>My account</MenuItem>
                </Menu>
                <Menu
                    id="menu-noti"
                    anchorEl={notAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(notAnchorEl)}
                    onClose={handleNotificationClose}
                >
                    {
                        notifications.map(n => (
                            <ListItem dense key={n.id}>
                                <ListItemText>{ n?.message + ": " + n?.inputProduct?.restOfExpireDate }</ListItemText>
                            </ListItem>
                        ))
                    }
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default MainAppBar