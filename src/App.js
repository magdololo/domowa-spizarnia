import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Redirect } from 'react-router-dom';
import Page from './Page';
const images = [
    {
        url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Przetwory owocowe i miód',
        width: '33,3%',
        path: "./przetwory_owocowe_miod"
    },
    {
        url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Mąka, Makarony, Ryże',
        width: '33,3%',
        path: "./maka_makarony_ryze"
    },
    {
        url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Desery i pomoce cukiernicze',
        width: '33,3%',
        path: "./desery_pomoce_cukiernicze"
    },
    {
        url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Cukier i słodziki',
        width: '33,3%',
        path: "./cukier_słodziki"
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 180,
    width: "33.3%",
    [theme.breakpoints.down('sm')]: {
        width: '50% !important', // Overrides inline-style
        height: 130,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '2px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 2,
    right: 2,
    top: 2,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 2,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 2,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function App() {
    const location = useLocation();

    return (
        <Router>
            <h2 sx={{justifyContent: 'center', }}>Domowa spiżarnia</h2>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                        onClick={() => <Redirect to={'/'+image.path} />}
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}>
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}>
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImageButton>
            ))}
        </Box>
            <Page/>
        </Router>
    );
}


