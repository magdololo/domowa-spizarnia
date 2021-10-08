import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import * as React from "react";

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