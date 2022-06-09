import { Typography, InputLabel, Box, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AddPost = () => {
    const [inputs, setInputs] = useState({ caption: '', selectedFile: '' });

    const dispatch = useDispatch();

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
            createAt: new Date()
        }).catch((error) => console.log(error))
        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
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