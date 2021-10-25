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
       <List sx={{ width: '100%', backgroundColor: 'background.paper', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
           {products.map((product) => (
<>
               <ListItem key={product.id} alignItems="flex-start" sx={{ flex: '1 0 auto' }} component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}
                         secondaryAction={
                             <Box >
                                 <Fab color="primary" aria-label="add" size='small'>
                                     <AddIcon />
                                 </Fab>
                                 <h5 style={{fontSize: "1.2em"}}>{product.quantity}</h5>
                                 <Fab color="secondary" aria-label="remove" size='small'>
                                     <RemoveIcon />
                                 </Fab>

                                 <Fab color="primary" aria-label="delete" size='small'>
                                     <DeleteIcon />
                                 </Fab>
                             </Box>

                         //     <ButtonGroup variant="text" aria-label="text button group"  color="secondary">
                         //
                         //     <Button onClick={(e) => {
                         //         e.preventDefault();
                         //         decrementQuantity(product.id, product.quantity);
                         //     }} color="secondary">-</Button>
                         //     <h5 style={{fontSize: "1.2em"}}>{product.quantity}</h5>
                         //     <Button  onClick={(e)=>{
                         //     e.preventDefault();
                         //     incrementQuantity(product.id, product.quantity);
                         // }}  color="secondary">+</Button>
                         //     <Box>
                         //     <Tooltip title="Remove" placement="right-end" className={classes.disableHover}>
                         //         <IconButton>
                         //             <RemoveIcon color="secondary" onClick={(e) =>
                         //             {
                         //                 e.preventDefault();
                         //                 decrementQuantity(product.id, product.quantity);
                         //             }
                         //             }/>
                         //         </IconButton>
                         //     </Tooltip>
                         //     <h5 style={{fontSize: "1.2em"}}>{product.quantity}</h5>
                         //     <Tooltip title="Add" placement="right-end" className={classes.disableHover}>
                         //     <IconButton>
                         //     <AddIcon color="secondary" onClick={(e) =>
                         // {
                         //     e.preventDefault();
                         //     incrementQuantity(product.id, product.quantity);
                         // }
                         // }/>
                         //     </IconButton>
                         //     </Tooltip>
                         //     <Tooltip title="Delete" placement="right-end" className={classes.disableHover}>
                         //     <IconButton>
                         //     <DeleteIcon color="secondary" onClick={(e) =>
                         // {
                         //     e.preventDefault();
                         //     deleteProduct(product.id);
                         // }
                         // }/>
                         //     </IconButton>
                         //     </Tooltip>
                         //
                         //         {/*<IconButton edge="end" aria-label="comments" className={classes.disableHover}>*/}
                         //         {/*    <DeleteIcon color="secondary" onClick={(e) =>*/}
                         //         {/*    {*/}
                         //         {/*        e.preventDefault();*/}
                         //         {/*        deleteProduct(product.id);*/}
                         //         {/*    }*/}
                         //         {/*    }/>*/}
                         //         {/*</IconButton>*/}
                         //
                         //
                         //     //
                         //     {/*// </ButtonGroup>*/}
                         //
                         //     </Box>
                         }

               >

                       {/*<ListItemAvatar>*/}
                       {/*    <Avatar*/}
                       {/*        alt={product.name}*/}
                       {/*        src={`/static/images/avatar/${product.name}.jpg`}*/}
                       {/*    />*/}
                       {/*</ListItemAvatar>*/}

                   <ListItemText

                   primary= {

                               <Typography
                           sx={{ margin: "0 auto" , lineHeight: "0.9em", fontWeight: "bold", fontFamily: 'Archivo', paddingBottom: "5px", textTransform: "capitalize"}}
                           color="#646670"
                             >
                               {product.name}
                                </Typography>}

                           secondary={
                               <React.Fragment>
                                   <Typography
                                       sx={{ display: 'flex' }}
                                       component="span"
                                       variant="body2"
                                       color="#9a9eb5"

                                   >
                                       {dateFormat(product.expireDate,'isoDate')}
                                   </Typography>
                                   {product.capacity !== 0 ?
                                   <Typography
                                       sx={{ display: 'flex' }}
                                       component="span"
                                       variant="subtitle"
                                       color="#b2b6d1"
                                   >
                                       {product.capacity} {product.unit}
                                   </Typography> :
                                       <span>&nbsp;</span>}
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