import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Box, Button, Tab, Tabs, Container, useMediaQuery, useTheme } from '@mui/material';
import logo from '../images/logos.png';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
import { DrawerComponent } from './DrawerComponent';

const Header = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch();
    const [value, setValue] = useState(0)
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <AppBar position="static" sx={{
            background: "radial-gradient(circle, rgba(251, 252, 67, 1) 0%, rgba(250, 166, 8, 1) 39%, rgba(237, 131, 58, 1) 67%, rgba(255, 0, 0, 1) 100%)"
        }}>
            <Toolbar>
                <Typography variant="h4"><img width={"70px"} src={logo} alt="logo" /></Typography>
                {
                    isMatch ? (
                        <>
                            <DrawerComponent />
                        </>
                    ) : (
                        <>
                            {isLoggedIn && (
                                <Box display="flex" marginLeft="auto">
                                    <Tabs textColor="inherit" sx={{ color: "black" }} value={value} onChange={handleChange}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor: "black"
                                            }
                                        }}>
                                        <Tab component={NavLink} to='/posts' label="All Posts" />
                                        <Tab component={NavLink} to='/myposts' label="My Posts" />
                                        <Tab component={NavLink} to='/posts/add' label="Add Post" />
                                    </Tabs>
                                </Box>
                            )}
                            <Box display="flex" marginLeft="auto">
                                {!isLoggedIn && <>
                                    <Button sx={{ margin: 1, color: "black" }} color="warning" variant="contained" component={NavLink} to='/auth'>
                                        Login
                                    </Button>
                                    <Button sx={{ margin: 1, color: "black" }} color="warning" variant="contained" component={NavLink} to='/auth'>
                                        Signup
                                    </Button> </>
                                }
                                {isLoggedIn && (
                                    <Button onClick={() => dispatch(authActions.logout())} sx={{ margin: 1, color: "black" }} color="warning" variant="contained" component={NavLink} to='/auth'>
                                        Logout
                                    </Button>
                                )}
                            </Box>
                        </>
                    )
                }

            </Toolbar>
        </AppBar >
    )
}

export default Header; 