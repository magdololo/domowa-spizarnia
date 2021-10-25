import * as React from 'react';
import List from '@mui/material/List';

import {Link, useParams} from "react-router-dom";
import useStore from "../store/useStore";
import {useEffect} from "react";
import {AppBar, InputBase, useMediaQuery} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from "@material-ui/core/styles";
import {styled} from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import {alpha} from "@material-ui/core";
import AddProductModal from "../components/AddProductModal";
import ProductListItem from "../components/ProductListItem";

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
    const StyledFab = styled(Fab)({
        position: 'relative',
        zIndex: 1,
        top: -30,
        left: 0,
        right: -100,
        margin: '0 auto',
    });
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '66%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '90',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '50%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));


    return (

<>
   <div>
       <List>
           {products.map((product) => (
            <ProductListItem product={product} component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}></ProductListItem>
               ))}

       </List>


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
   </div>

</>
    );
}

export default CategoryDetail;