import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import EditIcon from '@mui/icons-material/Edit';
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import * as React from "react";
import useStore from "../store/useStore";
import {Button, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImagePickerModal from "./ImagePickerModal";
import slugify from "slugify";
import {useState} from "react";
const EditCategoryImageList =()=> {
    const categoryList = useStore(state => state.categories);
    const deleteCategory  = useStore(state => state.deleteCategory);
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newCategoryName,setNewCategoryName] = useState('');
    const pickedImage = useStore(state=>state.pickedImage);
    const setPickedImage = useStore(state=>state.setPickedImage)
    const editCategory = useStore(state => state.editCategory);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "75%",
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 1200,
    }
    return(
        <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '94%', margin: '0 auto'}}>
    <ImageList cols={minWidth600 ? 3 : 2} >
        {categoryList.map((item) => (
            <ImageListItem key={item.id} sx={{displayInline: "flex", alignItems: "center", justifyContent: "center", margin: 0, padding: 0}}>
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
                        textShadow: "1px 1px solid gray",
                        zIndex: 999,
                        top: "0.5em",
                        position: "absolute",
                        left: ".4em",
                        // width: "40px",
                        // height: "40px"
                    }}
                    aria-label={`info about ${item.title}`}>
                    <EditIcon style={{
                        fontSize: "1.3em",
                        color: 'white'
                    }} onClick={() => handleOpen()}/>
                    <Modal sx={{zIndex: '1200'}}
                           open={open}
                           onClose={handleClose}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edytuj kategorię
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                                <TextField id="standard-basic" label="Nazwa kategorii" variant="standard" onChange={ e => setNewCategoryName(e.target.value)} />
                            </Typography>

                            <ImageListItem key={pickedImage.id} cols={1} rowHeight={120} rowWidth={200}>

                                <img
                                    src= {item.url}
                                    srcSet= {pickedImage.url}
                                    loading="lazy"
                                />

                            </ImageListItem>

                            <ImagePickerModal/>
                            <Button onClick={()=> {
                                String.prototype.capitalize = function() {
                                    return this.charAt(0).toUpperCase() + this.slice(1);
                                }
                                editCategory(item.id, item.url, item.title, item.path);
                                handleClose();
                                setPickedImage('');
                            }}>Edytuj kategorię</Button>
                        </Box>

                    </Modal>
                </IconButton>
                <IconButton
                    sx={{
                        color: "rgba(255, 255, 255, 0.54)",
                        textShadow: "1px 1px solid gray",
                        zIndex: 999,
                        top: "0.6em",
                        position: "absolute",
                        right: ".4em",
                        // width: "40px",
                        // height: "40px"
                    }}
                    aria-label={`info about ${item.title}`}
                >
                    <HighlightOffRoundedIcon style={{
                        lineHeight: "24px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.3em", color: 'red'}} onClick={() => deleteCategory(item.id)}/>
                </IconButton>
                <ImageListItemBar
                    sx={{width: "100%", height: "100%", textAlign: "center", color: '#fff'}}
                    title={item.title}
                    subtitle={item.author}
                />
            </ImageListItem>
        ))}
    </ImageList>
        </Box>
    )};
export default EditCategoryImageList;