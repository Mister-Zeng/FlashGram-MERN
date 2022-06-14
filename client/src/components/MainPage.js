import React from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import LandingImage from '../images/LandingImage.png';

const MainPage = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const outerBoxStyle = isMatch ? { display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column", padding: "60px 10px 10px 10px" } : { display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row", paddingTop: 20 };
    const aboutBoxStyle = isMatch ? { paddingTop: 8 } : { width: 700, paddingTop: 8 };
    const imageStyle = isMatch && { width: "100%" }
    const aboutTitleTypographyStyle = isMatch ? { fontSize: 26, fontWeight: "bold", fontFamily: "sans-serif", textAlign: "center", paddingBottom: 5 } : { fontSize: 30, fontWeight: "bold", fontFamily: "sans-serif", textAlign: "center", paddingBottom: 5 };
    const aboutDescriptionTypographyStyle = isMatch ? { fontSize: 20, fontFamily: "sans-serif", textAlign: "center" } : { fontSize: 20, fontFamily: "sans-serif", textAlign: "center" }

    return (
        <div className='mainPage'>
            <Box sx={outerBoxStyle}>
                <Box component="img" src={LandingImage} sx={imageStyle} />
                <Box sx={aboutBoxStyle}>
                    <Typography sx={aboutTitleTypographyStyle}>About us</Typography>
                    <Typography sx={aboutDescriptionTypographyStyle}>We are a social media company that aim for <b>diversity</b> and <b>inclusion</b>. We're committed to
                        fostering a safe and supportive community for everyone. <b>Express</b> yourself in a new way. <b> Connect</b> with more people, <b>build</b> connection, and <b>create</b> contents that's disctinctly yours.</Typography>
                </Box>
            </Box>
        </div>
    )
}

export default MainPage