import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, InputLabel, Box, TextField, Button } from '@mui/material';
import api from '../api/api';

const PostDetail = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const id = useParams().id;

    const fetchDetails = async () => {
        const res = await api.get(`/post/${id}`)
            .catch((error) => console.log(error.message))
        const data = await res.data;
        return data;
    }

    // once data is fetched, update the edited caption to the post
    useEffect(() => {
        fetchDetails()
            .then((data) => {
                setInputs({
                    caption: data.post.caption
                });
            });
    }, [id]);


    const sendRequest = async () => {
        const res = await api.put(`/post/update/${id}`, {
            caption: inputs.caption
        })
            .catch(error => console.log(error));
        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate('/myposts'))
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            {inputs &&
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow=" 10px 10px 20px #ccc" maxWidth={500} margin="auto" padding={3} marginTop={10} borderRadius={5}>
                        <Typography fontWeight={"bold"} padding={3} textAlign={"center"} fontSize={22} fontFamily="georgia">Edit Your Post</Typography>
                        <InputLabel sx={{ mb: 1, mt: 2, fontSize: 15 }}>Caption</InputLabel>
                        <TextField value={inputs.caption} name="caption" onChange={handleChange} fullWidth />
                        <Button variant="contained" type="submit" color="warning" sx={{ marginTop: 3 }}>Submit</Button>
                    </Box>
                </form>
            }
        </div>
    )
}

export default PostDetail;