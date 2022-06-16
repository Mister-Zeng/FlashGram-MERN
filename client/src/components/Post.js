import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Box, Modal, Button, MenuItem, Menu } from '@mui/material';
import profile from '../images/profile.jpeg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { authActions } from '../store';
import { useSelector, useDispatch } from 'react-redux';

const Post = ({ username, caption, selectedFile, createAt, isUser, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleEdit = (e) => {
        navigate(`/myposts/${id}`)
    }

    const post = useSelector(state => state.posts)
    const likePost = async () => {
        try {
            const { data } = await axios.patch(`post/${id}/likePost`)
            dispatch(authActions.like(data))
            console.log(data)
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const handleCloseModal = () => setOpen(false);

    const handleDelete = () => {
        setOpen(true);
    };

    const handleDeleteFalse = () => {
        setOpen(false)
        handleClose()
    };

    const handleDeleteTrue = async () => {
        try {
            const { data } = await axios.delete(`/post/${id}`)
            console.log(data)
            window.location.reload();
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const openAnchor = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                height="350"
                image={selectedFile}
                alt="post"
            />
            <CardContent sx={{ padding: 1 }}>
                <Button size="small" style={{ color: "grey", padding: 3, right: 3 }} onClick={likePost}>
                    <ThumbUpIcon style={{ color: "grey", paddingRight: 3, fontSize: 15 }} /> Like {post.likeCount}
                </Button>
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
