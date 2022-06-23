import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Box, Button, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import logo from '../images/logos.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { authActions } from "../store/auth";
import DrawerComponent from './DrawerComponent';
import decode from "jwt-decode";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch();
    const [value, setValue] = useState(0)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const logout = () => {
        dispatch(authActions.logout())
        navigate("/")
    }

    useEffect(() => {
        const token = user?.token
        // decode token and once token expires, it will auto logout 
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem("user")));
    }, [location])

    return (
        <React.Fragment>
            <AppBar position="fixed" sx={{
                background: "linear-gradient(168deg, rgba(251, 252, 67, 1) 0%, rgba(250, 166, 8, 1) 39%, rgba(237, 131, 58, 1) 67%, rgba(255, 0, 0, 1) 100%)"
            }}>
                <Toolbar>
                    <Typography variant="h4"><img width={"70px"} src={logo} alt="logo" /></Typography>
                    {
                        isMatch ? ( // If screen width is medium breakdown size, show hamburger navbar other wise full navbar
                            <>
                                <DrawerComponent />
                            </>
                        ) : (
                            <>
                                {isLoggedIn && ( // Tabs to show when user is logged in and not logged in
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
                                {!isLoggedIn && <>
                                    <Box display="flex" marginLeft="auto">
                                        <Button sx={{ margin: 1, color: "black" }} color="warning" variant="contained" component={NavLink} to='/login'>
                                            Login
                                        </Button>
                                        <Button sx={{ margin: 1, color: "black" }} color="warning" variant="contained" component={NavLink} to='/signup'>
                                            Signup
                                        </Button>
                                    </Box>
                                </>
                                }
                                {isLoggedIn && (
                                    <Button onClick={logout} sx={{ margin: 1, color: "black" }} color="warning" variant="contained" component={NavLink} to='/'>
                                        Log out
                                    </Button>
                                )}
                            </>
                        )
                    }
                </Toolbar>
            </AppBar >
            <Toolbar />
        </React.Fragment>
    )
}

export default Header;


