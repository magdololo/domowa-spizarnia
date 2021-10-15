import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {Button, ImageList, ImageListItem, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import ImagePickerModal from "./ImagePickerModal";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import useStore from "../store/useStore";
import {useState} from "react";
import slugify from "slugify";
import {Link} from "react-router-dom";


const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        width: "100%",
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 150,
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
//
// const ImageSrc = styled('span')({
//     position: 'absolute',
//     left: 2,
//     right: 2,
//     top: 2,
//     bottom: 0,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center 40%',
// });

// const Image = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.common.white,
// }));
//
// const ImageBackdrop = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 2,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.6,
//     transition: theme.transitions.create('opacity'),
// }));
//
// const ImageMarked = styled('span')(({ theme }) => ({
//     height: 2,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: 'absolute',
//     bottom: -2,
//     left: 'calc(50% - 9px)',
//     transition: theme.transitions.create('opacity'),
// }));


   const CategoryImageList =()=>{

    const [newCategoryName,setNewCategoryName] = useState('');
    const categoryList = useStore(state => state.categories);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const pickedImage = useStore(state=>state.pickedImage);
    const setPickedImage = useStore(state=>state.setPickedImage);
    const addCategory = useStore(state => state.addCategory);
    const minWidth600 = useMediaQuery('(min-width:600px)');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 1200,
    }

           return (

               <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '94%', margin: '0 auto'}}>
                   <ImageList cols={ minWidth600 ? 3: 2 } >
                       {categoryList.map((item) => (
                           <ImageListItem key={item.id} component={Link} to={"/" + item.path}>

                               <img src={item.url} srcSet={item.url} alt={item.title} loading="lazy"/>
                                   <Typography component="span"
                                       sx={{
                                           color: "white",
                                           letterSpacing: '0.019em',
                                           fontSize: '1rem',
                                           textAlign: 'center',
                                           position: 'absolute',
                                           bottom: 0,
                                           right: 0,
                                           left: 0,
                                           pt: 2,
                                           pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                           backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                           textTransform: "capitalize",
                                           }}>
                                       {item.title}
                                   </Typography>

                           </ImageListItem>

                       ))}
                <ImageListItem sx={{backgroundColor: 'lightgray', display: 'flex', position: 'relative', minHeight: '100px'}}>
                    <img src='/images/placeholder.png' />
                <Fab sx={{border: '0', position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)',}} size="medium" color="secondary" aria-label="add" >
                    <AddIcon onClick={handleOpen}/>
                    <Modal sx={{zIndex: '1200'}}
                           open={open}
                           onClose={handleClose}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Dodaj nową kategorię
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                                <TextField id="standard-basic" label="Nazwa kategorii" variant="standard" onChange={ e => setNewCategoryName(e.target.value)} />
                            </Typography>

                            <ImageListItem key={pickedImage.id} cols={1} rowHeight={120} rowWidth={200}>

                                    <img
                                        src= {pickedImage}
                                        srcSet= {pickedImage.url}
                                        loading="lazy"
                                    />

                            </ImageListItem>

                        <ImagePickerModal/>
                            <Button onClick={()=> {
                                String.prototype.capitalize = function() {
                                    return this.charAt(0).toUpperCase() + this.slice(1);
                                }
                                addCategory({
                                    "url": pickedImage,
                                    "title": newCategoryName.capitalize(),
                                    "path": slugify(newCategoryName, "_"),
                                });

                                handleClose();
                                setPickedImage('');
                            }}>Dodaj kategorię</Button>
                        </Box>

                    </Modal>

                </Fab>
            </ImageListItem>

                   </ImageList>
               </Box>

           );
}
export default CategoryImageList;