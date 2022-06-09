import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = ({ username, caption, selectedFile, createAt }) => {
    return (
        <Card sx={{ maxWidth: "40%", margin: "auto", mt: 2, padding: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        U
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
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
