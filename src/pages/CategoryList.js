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
import ImagePickerModal from "../components/ImagePickerModal";
import CategoryImageList from "../components/CategoryImageList";






const CategoryList = ()=> {

    const categoryList = useStore(state => state.categories);
    console.log(categoryList);
    const fetchCategories = useStore(state => state.fetch);

    const deleteCategory  = useStore(state => state.deleteCategory);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const fetchImages = useStore(state => state.fetchImages)
    const imagesList = useStore(state => state.images);
    console.log(imagesList);
    //const [pickedImage, setPickedImage] = useState("");
    useEffect(() => {
        fetchCategories();
        fetchImages();

    }, [])


    console.log(fetchImages);


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
                : <CategoryImageList/>
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