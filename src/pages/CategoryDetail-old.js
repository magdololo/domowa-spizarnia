import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link, useParams} from "react-router-dom";
import useStore from "../store/useStore";
import {useEffect} from "react";
import {AppBar, Box, Button, ButtonGroup, Divider, InputBase, Tooltip, Typography, useMediaQuery} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from "@material-ui/core/styles";
import {styled} from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import dateFormat, { masks } from "dateformat";
import {alpha} from "@material-ui/core";
import AddProductModal from "../components/AddProductModal";
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles((theme) => ({
    disableHover: {

        "&:hover": {
            transition: "all 0.1s ease",
            transform: "scale(1.4)",
            backgroundColor: "transparent",
        }
    },

}));


const CategoryDetail = ()=> {

    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const deleteProduct= useStore(state => state.deleteProduct);
    const categories = useStore(state => state.categories);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)');
    const classes = useStyles();
    const incrementQuantity = useStore(state => state.incrementProduct);
    const decrementQuantity = useStore(state => state.decrementProduct);
    useEffect(()=>{
        fetchProducts();

    },[categories]);
    console.log(productsList);
    let { categoryName } = useParams();


const products = productsList.filter(product => product.categoryPath === categoryName );

console.log(products);//undefined
console.log(categoryName);
    if (products.length >= 2) {
        products.sort((a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            if (a < b) return -1;//keep a b
            if (a > b) return 1;//switch places b a
            return 0
        })

    }



    return (

<>


       <AppBar position="fixed" color="transparent"  sx={{ top: 'auto', bottom: 0 }}>
           <Toolbar sx={{width: minWidth900 ? '800px' : '100%', margin: '0 auto'}}>
               <Search>
                   <SearchIconWrapper>
                       <SearchIcon />
                   </SearchIconWrapper>
                   <StyledInputBase
                       placeholder="Search…"
                       inputProps={{ 'aria-label': 'search' }}
                   />
               </Search>
               <StyledFab color="secondary" aria-label="add">
                   <AddIcon onClick={handleOpen}/>
                   <AddProductModal open={open} close={handleClose}/>
               </StyledFab>
           </Toolbar>
       </AppBar>

</>
    );
}

export default CategoryDetail;