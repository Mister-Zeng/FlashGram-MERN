import React, { useState } from "react";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from "../actions/posts";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Form() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [postData, setPostData] = useState({
        creator: '',
        caption: '',
        selectedFile: ''
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData))
    }
    return (
        <div>
            <Button onClick={handleOpen}>Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">Login</Typography>
                        <TextField name="creator" label="Creator" fullWidthvalue={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}></TextField>
                        <TextField name="caption" label="Caption" fullWidthvalue={postData.caption} onChange={(e) => setPostData({ ...postData, caption: e.target.value })}></TextField>
                        <div>
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                        </div>
                        <button type="submit" >Submit</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
