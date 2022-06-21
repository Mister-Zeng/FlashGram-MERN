import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, InputLabel } from '@mui/material';
import logo from '../images/logos.png';
import { authActions } from "../store/auth";

const Login = () => {
    const loginFailure = useSelector(state => state.auth.error)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setInputs(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/user/login", {
                username: inputs.username,
                password: inputs.password,
            })
            const data = await res.data;
            dispatch(authActions.login());
            console.log(data)
            navigate("/posts");
            localStorage.setItem('userId', data.user._id);
        } catch (error) {
            dispatch(authActions.loginFailure());
            console.log(error.response.data.message);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: " 10px 10px 20px #ccc", maxWidth: 500, margin: "auto", padding: 3, marginTop: 10, borderRadius: 5 }}>
                    <Box component="img" src={logo} sx={{ width: 200 }} />
                    <Typography sx={{ fontSize: 25 }}>Welcome Back!</Typography>
                    <Typography>New to FlashGram?
                        <Button component={NavLink} to='/signup'> Signup</Button>
                    </Typography>
                    <Box
                        sx={{ width: 300, marginTop: 5 }}>
                        <InputLabel>Username</InputLabel>
                        <TextField onChange={handleChange} name="username" value={inputs.username} required label="Required" placeholder='Username' margin="normal" fullWidth />
                        <InputLabel>Password</InputLabel>
                        <TextField onChange={handleChange} name="password" value={inputs.password} required label="Required" type="password" placeholder='Password' margin="normal" fullWidth />
                        {loginFailure &&
                            <Typography sx={{ color: "red" }}>Invalid username or password</Typography>
                        }
                    </Box>
                    <Button type="submit" variant="outlined" color="warning" sx={{ marginTop: 2 }}> Login </Button>
                </Box>
            </form>
        </div >
    )
}

export default Login;