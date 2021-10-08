import Box from "@mui/material/Box";
import {Link, Redirect} from "react-router-dom";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import useStore from "../store/useStore";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {Modal, Switch, TextField, MenuItem, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";





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

function ExpandMoreIcon() {
    return null;
}

const CategoryList = ()=> {

    const categoryList = useStore(state => state.categories);
    console.log(categoryList);
    const fetchCategories = useStore(state => state.fetch);
    const addCategory = useStore(state => state.addCategory);
    const deleteCategory  = useStore(state => state.deleteCategory);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fetchImages = useStore(state => state.fetchImages)
    const imagesList = useStore(state => state.images);
    console.log(imagesList);
    const [pickedImage, setPickedImage] = useState("");
    useEffect(() => {
        fetchCategories();

    }, [])
    useEffect(() => {
        fetchImages();
    },[])

    console.log(fetchImages);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const onPick = (image) => {
       setPickedImage(image);
    }
    return (
        <>


          <div style={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
              <div style={{flex: '1 1 auto', width: '50%', textAlign: 'left', fontSize: '1.1rem', color: 'rgba(0, 0, 0, 0.6'}}>Lista Kategorii</div>
              <div style={{flex: '1 1 auto', width: '50%', textAlign: 'right', fontSize: '1.1rem', color: 'rgba(0, 0, 0, 0.6'}}>Edytuj kategorie<Switch color="primary" size="medium" onChange={() => setEditMode(!editMode)}/></div>

          </div>
            {editMode ?
                <ImageList cols={3}>
                    {categoryList.map((item) => (
                        <ImageListItem key={item.url} >
                            <img
                                src={item.url}
                                srcSet={item.url}
                                alt={item.url}
                                loading="lazy"
                                style={{filter: 'brightness(50%)'}}
                            />
                            <IconButton
                                sx={{
                                    color: "rgba(255, 255, 255, 0.54)",
                                    zIndex: 999,
                                    top: "10px",
                                    position: "absolute",
                                    right: "10px",
                                    width: "40px",
                                    height: "40px"
                                }}
                                aria-label={`info about ${item.title}`}
                            >
                                <HighlightOffRoundedIcon style={{ width: "40px", height: "40px", color: 'red' }} onClick={()=>deleteCategory(item.path)}/>
                            </IconButton>
                            <ImageListItemBar
                                sx={{ width: "100%", height: "100%", textAlign: "center" ,color: '#fff' }}
                                title={item.title}
                                subtitle={item.author}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                : <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
                    {categoryList.map((image) => (

                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width}}
                         >
                        <ImageSrc style={{backgroundImage: `url(${image.url})`}}/>
                        {/*<ImageBackdrop className="MuiImageBackdrop-root"/>*/}
                        <Image>
                            <Typography
                                component="span"

                                color="inherit"
                                sx={{

                                    letterSpacing: '0.019em',
                                    fontSize: '1rem',
                                    textAlign: 'center',
                                    position: 'absolute',
                                    bottom: 0,
                                    right:0,
                                    left: 0,
                                     pt: 2,
                                     pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    backgroundColor: 'rgba(0, 0, 0, 0.53)',
                                }}>
                                {image.title}
                                {/*<ImageMarked className="MuiImageMarked-root" />*/}
                            </Typography>

                        </Image>
                    </ImageButton>

                    ))}
                    <ImageButton sx={{backgroundColor: 'lightgray', display: 'inline-flex'}} >
                        <Fab sx={{border: '0'}} size="medium" color="secondary" aria-label="add">
                            <AddIcon onClick={handleOpen}/>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Dodaj nową kategorię
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <TextField id="standard-basic" label="Nazwa kategorii" variant="standard" />
                                    </Typography>
                                        <ImagePicker
                                            images={imagesList.map((image, i) => ({src: image.url, value: i}))}
                                            onPick={onPick}
                                        />
                                        {/*<Accordion sx={{marginTop:"10px"}}>*/}
                                        {/*    <AccordionSummary*/}
                                        {/*        expandIcon={<ExpandMoreIcon />}*/}
                                        {/*        aria-controls="panel1a-content"*/}
                                        {/*        id="panel1a-header"*/}
                                        {/*    >*/}
                                        {/*        <Typography >Wybierz zdjęcie</Typography>*/}
                                        {/*    </AccordionSummary>*/}
                                        {/*    <AccordionDetails>*/}
                                        {/*        <Typography>*/}
                                        {/*            <ImageList cols={1}>*/}
                                        {/*                {imagesList.map((item) => (*/}
                                        {/*                    <ImageListItem key={item.img}>*/}
                                        {/*                        <img*/}
                                        {/*                            src={item.img}*/}
                                        {/*                            srcSet={item.img}*/}
                                        {/*                            alt={item.title}*/}
                                        {/*                            loading="lazy"*/}
                                        {/*                        />*/}
                                        {/*                    </ImageListItem>*/}
                                        {/*                ))}*/}
                                        {/*            </ImageList>*/}
                                        {/*            );*/}
                                        {/*        </Typography>*/}
                                        {/*    </AccordionDetails>*/}
                                        {/*</Accordion>*/}

                                </Box>
                            </Modal>

                        </Fab>
                    </ImageButton>

                </Box>
            }
        </>
    )
}
export default CategoryList;

// addCategory({
//     "url": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     "title": "new category",
//     "width": "33,3%",
//     "path": "dupa-dupa",
// })