import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import * as React from "react";
import useStore from "../store/useStore";


const EditCategoryImageList =()=> {
    const categoryList = useStore(state => state.categories);
    const deleteCategory  = useStore(state => state.deleteCategory);
    return(
    <ImageList cols={3}>
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
                        fontSize: "1.6em", color: 'red'}}
                                             onClick={() => deleteCategory(item.id)}/>
                </IconButton>
                <ImageListItemBar
                    sx={{width: "100%", height: "100%", textAlign: "center", color: '#fff'}}
                    title={item.title}
                    subtitle={item.author}
                />
            </ImageListItem>
        ))}
    </ImageList>
    )};
export default EditCategoryImageList;