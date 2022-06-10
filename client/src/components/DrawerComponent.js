import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { authActions } from '../store';

const DrawerComponent = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [openDrawer, setOpenDrawer] = useState(false)
    const handleLogOutNav = () => {
        setOpenDrawer(false);
        dispatch(authActions.logout())
    }

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                {isLoggedIn && <>
                    <List>
                        <ListItemButton onClick={() => setOpenDrawer(false)} component={NavLink} to='/posts' >
                            <ListItemIcon>
                                <ListItemText>All Posts</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => setOpenDrawer(false)} component={NavLink} to='/myposts'>
                            <ListItemIcon>
                                <ListItemText>My Posts</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => setOpenDrawer(false)} component={NavLink} to='/posts/add'>
                            <ListItemIcon>
                                <ListItemText>Add Post</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={handleLogOutNav} component={NavLink} to='/auth'>
                            <ListItemIcon>
                                <ListItemText>Log out</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </>}
                {!isLoggedIn && <>
                    <List>
                        <ListItemButton onClick={() => setOpenDrawer(false)} component={NavLink} to='/login'>
                            <ListItemIcon>
                                <ListItemText>Login</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => setOpenDrawer(false)} component={NavLink} to='/signup'>
                            <ListItemIcon>
                                <ListItemText>Sign up</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </>}
            </Drawer >
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ marginLeft: "auto" }} >
                <MenuIcon />
            </IconButton>
        </React.Fragment >
    )
};

export default DrawerComponent;