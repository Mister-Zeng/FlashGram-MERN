import React from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import LandingImage from '../images/LandingImage.png';

const MainPage = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <div className='mainPage'>
            {
                isMatch ? (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column", padding: "100px 10px 10px 10px" }}>
                            <Box component="img" src={LandingImage} />
                            <Box sx={{ paddingTop: 8 }}>
                                <Typography sx={{ fontSize: 26, fontWeight: "bold", fontFamily: "sans-serif", textAlign: "center", paddingBottom: 5 }}>About us</Typography>
                                <Typography sx={{ fontSize: 16, fontFamily: "sans-serif", textAlign: "center" }}>We are a social media company that aim for <b>diversity</b> and <b>inclusion</b>. We're <b>committed</b> to
                                    fostering a safe and supportive community for everyone. <b>Express</b> yourself in a new way. <b>Connect</b>
                                    with more people, build connection, and create contents that's disctinctly yours.</Typography>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row", paddingTop: 20 }}>
                            <Box component="img" src={LandingImage} />
                            <Box sx={{ width: 700, paddingTop: 8 }}>
                                <Typography sx={{ fontSize: 30, fontWeight: "bold", fontFamily: "sans-serif", textAlign: "center", paddingBottom: 5 }}>About us</Typography>
                                <Typography sx={{ fontSize: 20, fontFamily: "sans-serif", textAlign: "center" }}>We are a social media company that aim for <b>diversity</b> and <b>inclusion</b>. We're <b>committed</b> to
                                    fostering a safe and supportive community for everyone. <b>Express</b> yourself in a new way. <b>Connect</b>
                                    with more people, build connection, and create contents that's disctinctly yours.</Typography>
                            </Box>
                        </Box>
                    </>
                )}
        </div>
    )
}

export default MainPage