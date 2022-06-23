import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { Typography, InputLabel, Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../store/post';
import api from '../api/api';

const AddPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const missingFile = useSelector(state => state.post.missingFile)
    const [inputs, setInputs] = useState({ caption: '', selectedFile: '' });

    // retrieving data from form and update to state
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/post/add", {
                caption: inputs.caption,
                selectedFile: inputs.selectedFile,
                user: JSON.parse(localStorage.getItem("user")).user._id,
                createAt: new Date(),
            })
            console.log(data);
            navigate('/myposts')
        } catch (error) {
            console.log(error.response.data.message)
        }

        // return true if no file is uploaded
        const fileEmpty = () => {
            if (inputs.selectedFile === "") {
                return true;
            }
        }

        // if no file is uploaded, dispatch missing file status to true and display message for 5 seconds 
        if (fileEmpty) {
            dispatch(postActions.missingFile())
            const timer = () => setTimeout(() => {
                dispatch(postActions.fileUploaded())
            }, 5000);
            timer()
            clearTimeout(timer);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow=" 10px 10px 20px #ccc" maxWidth={500} margin="auto" padding={3} marginTop={10} borderRadius={5}>
                    <Typography fontWeight={"bold"} padding={3} textAlign={"center"} fontSize={22} fontFamily="georgia">Add Your Post</Typography>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setInputs({ ...inputs, selectedFile: base64 })} />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: 16 }}>Caption</InputLabel>
                    <TextField required value={inputs.caption} name="caption" onChange={handleChange} fullWidth />
                    {missingFile &&
                        <Typography sx={{ color: "red" }}>Please upload a image</Typography>
                    }
                    <Button variant="contained" color="warning" type="submit" sx={{ marginTop: 3 }}>Submit</Button>
                </Box>
            </form>
        </div>
    )
}

export default AddPost;