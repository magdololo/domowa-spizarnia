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
import {AppBar, InputBase, Tooltip, useMediaQuery} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {styled} from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddModal from "../components/AddModal";
import {alpha} from "@material-ui/core";

const CategoryDetail = ()=> {

    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const categories = useStore(state => state.categories);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)');

    useEffect(()=>{
        fetchProducts();
    },[]);
    console.log(productsList);
    let { categoryName } = useParams();

      console.log(categoryName);

    const category = categories.filter(category=>category.path === categoryName);

const products = productsList.filter(product => product.categoryPath === categoryName );

console.log(products.categoryPath);//undefined
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


    return (
<>
   <div>
       <List>
           {products.map((product) => (
               <ListItem
                   key={product.id}
                   component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}
                   secondaryAction={
                       <Tooltip title="Delete">
                           <IconButton>
                               <DeleteIcon/>
                           </IconButton>
                       </Tooltip>
                   }>
                   <ListItemAvatar>
                       <Avatar>
                           <FolderIcon />
                       </Avatar>
                   </ListItemAvatar>
                   <ListItemText
                       primary={product.name}
                   />
               </ListItem>
           ))}
       </List>
       <AppBar position="fixed" color="primary"  sx={{ top: 'auto', bottom: 0 }}>
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
                   <AddModal open={open} close={handleClose}/>
               </StyledFab>
           </Toolbar>
       </AppBar>
   </div>

</>
    );
}

export default CategoryDetail;