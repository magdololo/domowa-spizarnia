import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import EditIcon from '@mui/icons-material/Edit';
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import * as React from "react";
import useStore from "../store/useStore";
import {useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import EditCategoryModal from "./EditCategoryModal";

const EditCategoryImageList =()=> {
    let categoryList = useStore(state => state.categories);
    const deleteCategory  = useStore(state => state.deleteCategory);
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const setEditCategory = useStore(state=>state.setEditCategory);
    const setEditCategoryModalOpen = useStore(state=>state.setEditCategoryModalOpen);
    const loggedInUser = useStore(state=> state.loggedInUser);
    const userId = loggedInUser.uid;
    const requiredCategoryId = useStore(state=>state.requiredCategoryId)
    categoryList = categoryList.filter(category => category.id !== requiredCategoryId);

    if (categoryList.length >= 2) {
        categoryList.sort((a, b) => {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();

            if (a < b) return -1;//keep a b
            if (a > b) return 1;//switch places b a
            return 0
        })

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

                    }}
                    aria-label={`info about ${item.title}`}>
                    <EditIcon style={{
                        fontSize: "1.3em",
                        color: 'white'
                    }} onClick={() => {
                        setEditCategory(item.user, item.url, item.title, item.path, item.id);
                        setEditCategoryModalOpen(true);
                    }}/>
                </IconButton>
                <IconButton
                    sx={{
                        color: "rgba(255, 255, 255, 0.54)",
                        textShadow: "1px 1px solid gray",
                        zIndex: 99,
                        top: "0.6em",
                        position: "absolute",
                        right: ".4em",

                    }}
                    aria-label={`info about ${item.title}`}
                >
                    <HighlightOffRoundedIcon
                        style={{
                        lineHeight: "24px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.3em", color: 'red'}} onClick={() => {
                            deleteCategory(userId, item.id);
                    }}/>
                </IconButton>
                <ImageListItemBar
                    sx={{width: "100%", height: "100%", textAlign: "center", color: '#fff'}}
                    title={item.title}
                    subtitle={item.author}
                />
            </ImageListItem>
        ))}
    </ImageList>
            <EditCategoryModal />
        </Box>
    )};
export default EditCategoryImageList;