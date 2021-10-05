import Box from "@mui/material/Box";
import {Link, Redirect} from "react-router-dom";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useEffect} from "react";
import useStore from "../store/useStore";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';






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

const CategoryList = ()=> {

    const categoryList = useStore(state => state.categories);
    console.log(categoryList);
    const fetchCategories = useStore(state => state.fetch);
    const addCategory = useStore(state => state.addCategory);

    useEffect(()=>{
        fetchCategories();
    },[])


    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <ImageList>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">December</ListSubheader>
            </ImageListItem>
            {categoryList.map((item) => (
                <ImageListItem key={item.url}>
                    <img
                        src={item.url}
                        srcSet={item.url}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                                <HighlightOffRoundedIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
        </Box>
    );
}
            export default CategoryList;





            {/*  <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {categoryList.map((image) => (
                    <ImageButton
                        component={(props)=> <Link {...props} to={'/'+image.path} />}
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
                                    letterSpacing: '0.019em',
                                    fontSize: '0.92rem',
                                    textAlign: 'center',
                                    position: 'relative',
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}>
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                            <Typography>
                               <HighlightOffRoundedIcon  sx={{
                                   textAlign: 'center',
                                   position: 'absolute',
                                   right: '10px',
                                   top: '10px',
                                   color: 'red',

                               }}size="small"/>
                            </Typography>
                        </Image>
                    </ImageButton>

                ))}
                <ImageButton sx={{ backgroundColor: 'lightgray', display: 'inline-flex', }} >
                        <Fab sx={{border: '0'}} size="medium" color="secondary" aria-label="add" >
                            <AddIcon onClick={()=> {
                                addCategory({
                                    "url": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
                                    "title": "new category",
                                    "width": "33,3%",
                                    "path": "dupa-dupa",
                                    })
                            }} />
                        </Fab>

                </ImageButton>
            </Box>
            </ImageButton>*/}

