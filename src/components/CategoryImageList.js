import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {ImageList, ImageListItem, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

import {Link} from "react-router-dom";
import useStore from "../store/useStore";
import AddModal from "./AddModal";



   const CategoryImageList =()=>{


    const categoryList = useStore(state => state.categories);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth600 = useMediaQuery('(min-width:600px)');



           return (

               <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '94%', margin: '0 auto'}}>
                   <ImageList cols={ minWidth600 ? 3: 2 } >
                       {categoryList.map((item) => (
                           <ImageListItem key={item.id} component={Link} to={"/" + item.path}>

                               <img src={item.url} srcSet={item.url} alt={item.title} loading="lazy"/>
                                   <Typography component="span" key={'typography_'+item.id}
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
                <ImageListItem sx={{backgroundColor: 'lightgray', display: 'flex', position: 'relative', minHeight: '100px'}} key={0}>
                    <img src='/images/placeholder.png' alt="placeholder"/>
                <Fab sx={{border: '0', position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)',}} size="medium" color="secondary" aria-label="add" >
                    <AddIcon onClick={handleOpen}/>
                   <AddModal open={open} close={handleClose}/>
                </Fab>
            </ImageListItem>

                   </ImageList>
               </Box>

           );
}
export default CategoryImageList;