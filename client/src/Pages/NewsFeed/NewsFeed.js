import React, { useState, useEffect } from 'react';
import Post from '../../Components/Post/Post';
import { LoggedInNavBar } from '../../Components/NavBar/LoggedInNavBar';

export function NewsFeed() {
    const [posts, setPosts] = useState([
        {
            username: "Jonny",
            caption: "What a nice weather.",
            imageUrl: "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/images/weather/holiday-weather/orlando-usa.jpg"
        },
        {
            username: "Liz",
            caption: "City Vibes",
            imageUrl: "https://media-exp1.licdn.com/dms/image/C4E1BAQGvXtm_dzZ_XQ/company-background_10000/0/1525884790498?e=2147483647&v=beta&t=RrmQ_3q2BmZnHe_3yJKBX1i4HwgyGOHlXafA-kyPO9o"
        }
    ]);

    return (
        <div>
            <LoggedInNavBar />

            {posts.map(post =>
                <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            )}
        </div>
    )
}