import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link, useParams} from "react-router-dom";
import useStore from "../store/useStore";
import {useEffect} from "react";
import {AppBar, Button, ButtonGroup, Divider, InputBase, Tooltip, Typography, useMediaQuery} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";
import {styled} from "@mui/material/styles";
import Fab from '@mui/material/Fab';

import {alpha} from "@material-ui/core";
import AddProductModal from "../components/AddProductModal";


const useStyles = makeStyles((theme) => ({
    myClassName: {

        "&:hover": {
            transition: "all 0.1s ease",
            transform: "scale(1.4)",
            backgroundColor: "transparent",
        }
    }
}));
const CategoryDetail = ()=> {

    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const deleteProduct= useStore(state => state.deleteProduct);
    const categories = useStore(state => state.categories);
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React. useState(1);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)');
    const classes = useStyles();
    useEffect(()=>{
        fetchProducts();

    },[categories, count]);
    console.log(productsList);
    let { categoryName } = useParams();

      console.log(categoryName);

    const category = categories.filter(category=>category.path === categoryName);

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
        height: '100%',
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

    const handleIncrement = (e) => {
        e.preventDefault();
        setCount(prevCount => prevCount + 1);
    };

    //Create handleDecrement event handler
    const handleDecrement = (e) => {
        e.preventDefault();
        setCount(prevCount => prevCount - 1);
    };
    return (
<>
   <div>
       <List sx={{ width: '90%', backgroundColor: 'background.paper', margin: '0 auto' }}>
           {products.map((product) => (
<>
               <ListItem key={product.id} alignItems="flex-start" component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}
                         secondaryAction={

                             <ButtonGroup variant="text" aria-label="text button group"  color="secondary" >
                                 <Button>
                                     <Button onClick={handleDecrement} size="large"  color="secondary">-</Button>
                                     <h5 style={{fontSize: "1.2em"}}>{count}</h5>
                                     <Button onClick={handleIncrement}  color="secondary">+</Button>
                                </Button>

                                 <IconButton edge="end" aria-label="comments" className={classes.myClassName}>
                                     <DeleteIcon color="secondary" onClick={(e) =>
                                     {
                                         e.preventDefault();
                                         deleteProduct(product.id);
                                     }
                                     }/>
                                 </IconButton>



                             </ButtonGroup>
                         }

               >

                       <ListItemAvatar>
                           <Avatar
                               alt={product.name}
                               src={`/static/images/avatar/${product.name}.jpg`}
                           />
                       </ListItemAvatar>

                   <ListItemText
                           primary={product.name}
                           secondary={
                               <React.Fragment>
                                   <Typography
                                       sx={{ display: 'inline' }}
                                       component="span"
                                       variant="body2"
                                       color="text.primary"
                                   >
                                       Data ważności: {product.expireDate}
                                   </Typography>
                               </React.Fragment>
                           }
                           />
                   {/*</ListItemButton>*/}




               </ListItem>
               <Divider variant="inset" component="li" />
               </>
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