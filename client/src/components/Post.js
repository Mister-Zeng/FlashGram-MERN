import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Box, Modal, Button, MenuItem, Menu } from '@mui/material';
import profile from '../images/profile.jpeg'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = ({ username, caption, selectedFile, createAt, isUser, id }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleCloseModal = () => setOpen(false);

    const deleteRequest = async () => {
        const res = await axios.delete(`/post/${id}`)
            .catch(error => console.log(error));
        const data = await res.data;
        return data;
    };

    const handleDelete = () => {
        setOpen(true);
    };

    const handleDeleteTrue = () => {
        deleteRequest()
            .then(() => navigate('/posts'))
    };

    const handleDeleteFalse = () => {
        setOpen(false)
        handleClose()
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const openAnchor = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (e) => {
        navigate(`/myposts/${id}`)
    }

    const popupStyle = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: 10,
        paddingTop: 20,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        backgroundColor: 'white',
        borderRadius: 5,
        boxShadow: 24
    }

    return (
        <Card sx={{ maxWidth: "500px", maxHeight: "500px", margin: "auto", mt: 5, padding: 2 }} >
            <CardHeader
                avatar={
                    <Avatar>
                        <CardMedia
                            component="img"
                            image={profile}
                            alt="profile image"
                        />
                    </Avatar>
                }

                title={username}

                action={
                    isUser && (
                        <>
                            <Button
                                onClick={handleClick}
                            >
                                <MoreVertIcon style={{ color: 'grey' }} />
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openAnchor}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                <Modal
                                    open={open}
                                    onClose={handleCloseModal}>
                                    <Box style={popupStyle}>
                                        <Typography>
                                            Confirm to delete
                                        </Typography>
                                        <Box>
                                            <Button onClick={handleDeleteTrue}>Yes</Button>
                                            <Button onClick={handleDeleteFalse}>No</Button>
                                        </Box>
                                    </Box>
                                </Modal>
                            </Menu>
                        </>
                    )
                }
            />
            < CardMedia
                component="img"
                height="375"
                image={selectedFile}
                alt="post"
            />
            <CardContent>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b sx={{ fontSize: 15 }}>{username}</b> {caption}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 11 }} >
                    {createAt}
                </Typography>
            </CardContent>
        </Card >
    );
}

export default Post
