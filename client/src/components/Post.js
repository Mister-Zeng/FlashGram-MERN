import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
            .then(() => navigate('/myposts'))
    }

    return (
        <Card sx={{ maxWidth: "40%", margin: "auto", mt: 2, padding: 2 }}>
            {isUser && (
                <Box display="flex">
                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Box>
            )}

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        U
                    </Avatar>
                }

                title={username}
            />
            <CardMedia
                component="img"
                height="194"
                image={selectedFile}
                alt="post"
            />
            <CardContent>
                <Typography variant="body2" sx={{ fontSize: 15 }}>
                    <b>{username}</b> {caption}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 10 }} >
                    {createAt}
                </Typography>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
}

export default Post
