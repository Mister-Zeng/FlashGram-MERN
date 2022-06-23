import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
    return (
        < Box sx={{ position: "absolute", top: "50%", left: "48%" }}>
            <CircularProgress />
        </Box>
    )
}

export default LoadingSpinner;