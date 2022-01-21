import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {ImageList, ImageListItem, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

import {Link} from "react-router-dom";
import useStore from "../store/useStore";
import AddCategoryModal from "./AddCategoryModal";
import AppBarBottom from "./AppBarBottom";
import ButtonBase from "@mui/material/ButtonBase";



   const CategoryImageList =({categoryList})=>{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth600 = useMediaQuery('(min-width:600px)');
    const products = useStore(state => state.products);
           if (categoryList != null && categoryList.length >= 2) {
               categoryList.sort((a, b) => {
                   a = a.title.toLowerCase();
                   b = b.title.toLowerCase();

                   if (a < b) return -1;//keep a b
                   if (a > b) return 1;//switch places b a
                   return 0
               })

           }


          
           return (
               <>
               <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '94%', margin: '0 auto', paddingBottom: 40}}>
                   <ImageList cols={ minWidth600 ? 3: 2 } >
                       {categoryList.map((item) => (
                           <ImageListItem key={item.id} component={Link} to={"/" + item.path}>
                               <img className="categoryListItem" src={item.url} srcSet={item.url} alt={item.title} loading="lazy" key={'img'+item.id}/>
                                   <Typography component="span" key={'typography_'+item.id}
                                       sx={{
                                           color: "white",
                                           letterSpacing: minWidth600 ? '0.08' : '0.12em',
                                           fontSize: minWidth600 ? '1rem' : '.9rem',
                                           textAlign: 'center',
                                           position: 'absolute',
                                           bottom: 0,
                                           right: 0,
                                           left: 0,
                                           minHeight: '40%',
                                           display: 'inline-flex',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                           p: '2px 0',
                                           backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                           textTransform: "capitalize",
                                           }}>
                                       {item.title}
                                   </Typography>
                           </ImageListItem>

                       ))}
                <ImageListItem sx={{backgroundColor: 'lightgray', display: 'flex', position: 'relative', minHeight: '100px'}} key={0} >
                    <img src='/images/placeholder.png' alt="placeholder" />
                <Typography sx={{border: '0', position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)',textAlign: 'center'}} size="medium" color="secondary" aria-label="add" >
                    <AddCategoryModal open={open} close={handleClose}/>
                    <ButtonBase onClick={handleOpen}>
                    <AddIcon  color="secondary" cursor="pointer" sx={{ textAlign: 'center'}} />
                    <Typography component="span"
                                sx={{
                                    color: "gray",
                                    letterSpacing: '0.09em',
                                    fontSize: minWidth600 ? '1rem' : '.8rem',
                                    textAlign: 'center',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textTransform: 'capitalize',
                                    cursor: 'pointer'}}
                                >
                        Dodaj kategorię
                    </Typography>
                    </ButtonBase>
                </Typography>
            </ImageListItem>

                   </ImageList>
               </Box>
             <AppBarBottom isAddProductFromListCategory={true} allProducts={products}/>
            </>
           );
}
export default CategoryImageList;