import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import profile from '../images/profile.jpeg'

const Post = ({ username, caption, selectedFile, createAt, isUser, id }) => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        navigate(`/myposts/${id}`)
    }

    const deleteRequest = async () => {
        const res = await axios.delete(`/post/${id}`)
            .catch(error => console.log(error));
        const data = await res.data;
        return data;
    }
    const handleDelete = () => {
        deleteRequest()
            .then((data) => console.log(data))
            .then(() => navigate('/posts'))

    }

    return (
        <Card sx={{ maxWidth: "500px", maxHeight: "500px", margin: "auto", mt: 5, padding: 2 }}>


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
                        <Box display="flex" position="relative" sx={{ top: "10px" }}>
                            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleDelete}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Box>
                    )
                }
            />
            <CardMedia
                component="img"
                height="375"
                image={selectedFile}
                alt="post"
            />
            <CardContent>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b sx={{ fontSize: 15 }}>{username}</b> {caption}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 10 }} >
                    {createAt}
                </Typography>
            </CardContent>
        </Card >
    );
}

export default Post
