import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Box, Button, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import logo from '../images/logos.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { authActions } from "../store/auth";
import DrawerComponent from './DrawerComponent';
import decode from "jwt-decode";
import UserContext from '../context/UserContext';


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const { userData } = useContext(UserContext);

    const logout = () => {
        dispatch(authActions.logout())
        navigate("/")
    }

    useEffect(() => {
        const token = userData?.token
        // decode token and once token expires, it will auto logout 
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
    }, [location.pathname])

    const buttonStyles = { margin: 1, color: "black" }
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
                                        <Button sx={buttonStyles} component={NavLink} to='/posts'>All Posts</Button>
                                        <Button sx={buttonStyles} component={NavLink} to='/myposts'>My Posts</Button>
                                        <Button sx={buttonStyles} component={NavLink} to='/posts/add'>Add Post</Button>
                                    </Box>
                                )}
                                {!isLoggedIn && <>
                                    <Box display="flex" marginLeft="auto">
                                        <Button sx={buttonStyles} color="warning" variant="contained" component={NavLink} to='/login'>
                                            Login
                                        </Button>
                                        <Button sx={buttonStyles} color="warning" variant="contained" component={NavLink} to='/signup'>
                                            Signup
                                        </Button>
                                    </Box>
                                </>
                                }
                                {isLoggedIn && (
                                    <Button onClick={logout} sx={buttonStyles} color="warning" variant="contained" component={NavLink} to='/'>
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


