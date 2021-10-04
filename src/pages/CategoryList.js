import Box from "@mui/material/Box";
import {Link, Redirect} from "react-router-dom";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import { useSelector, useDispatch } from 'react-redux';
import {addCategory, deleteCategory, editCategory, addInitialCategory, asyncFetch} from '../storeroomSlice'
import {useEffect} from "react";


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

    const categoryList = useSelector((state)=> state.storeroom.categories) //storeroom nazwa slice'a i categories nazwa z initial state

    const dispatch = useDispatch();
    useEffect(()=>{
        asyncFetch().then(fetchedData=>{
            dispatch(addInitialCategory(fetchedData));
        });
    },categoryList)


    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
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
                        </Image>
                    </ImageButton>
                ))}
            </Box>
        </>
    );
}

export default CategoryList;