import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { Typography, InputLabel, Box, TextField, Button } from '@mui/material';

const AddPost = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ caption: '', selectedFile: '' });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = async () => {
        const res = await axios.post("/post/add", {
            caption: inputs.caption,
            selectedFile: inputs.selectedFile,
            user: localStorage.getItem("userId"),
            createAt: new Date(),
            username: localStorage.getItem("username")
        }).catch((error) => console.log(error))
        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate('/myposts'))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow=" 10px 10px 20px #ccc" maxWidth={500} margin="auto" padding={3} marginTop={10} borderRadius={5}>
                    <Typography fontWeight={"bold"} padding={3} textAlign={"center"} fontSize={22}>Add Your Post</Typography>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setInputs({ ...inputs, selectedFile: base64 })} />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: 15 }}>Caption</InputLabel>
                    <TextField value={inputs.caption} name="caption" onChange={handleChange} fullWidth />
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </form>
        </div>
    )
}

export default AddPost;