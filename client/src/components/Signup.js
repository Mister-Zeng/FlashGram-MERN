import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import api from '../api/api';
import { Box, Typography, TextField, Button, InputLabel } from '@mui/material';
import logo from '../images/logos.png';
import { authActions } from "../store/auth";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
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
            const res = await api.post("/user/signup", {
                name: inputs.name,
                email: inputs.email,
                username: inputs.username,
                password: inputs.password,
            })
            const data = await res.data;
            dispatch(authActions.login());
            localStorage.setItem('user', JSON.stringify(data));
            navigate("/posts");
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow=" 10px 10px 20px #ccc" maxWidth={500} margin="auto" padding={3} marginTop={10} borderRadius={5}>
                    <Box component="img" src={logo} sx={{ width: 200 }} />
                    <Typography sx={{ fontSize: 25 }}>Welcome Back! </Typography>
                    <Typography>Already have an account?
                        <Button component={NavLink} to='/login'>Login</Button>
                    </Typography>
                    <Box
                        sx={{ width: 300, marginTop: 5 }}>
                        <InputLabel>Username</InputLabel>
                        <TextField onChange={handleChange} name="username" value={inputs.username} required label="Required" placeholder='Username' margin="normal" fullWidth />
                        <InputLabel>Name</InputLabel>
                        <TextField onChange={handleChange} name="name" value={inputs.name} required label="Required" placeholder='Name' margin="normal" fullWidth />
                        <InputLabel>Email</InputLabel>
                        <TextField onChange={handleChange} name="email" value={inputs.email} required label="Required" type="email" placeholder='Email' margin="normal" fullWidth />
                        <InputLabel>Password</InputLabel>
                        <TextField onChange={handleChange} name="password" value={inputs.password} required label="Required" type="password" placeholder='Password' margin="normal" fullWidth />
                    </Box>
                    <Button type="submit" variant="outlined" color="warning" sx={{ marginTop: 2 }}> Signup </Button>
                </Box>
            </form>
        </div >
    )
};

export default Signup;