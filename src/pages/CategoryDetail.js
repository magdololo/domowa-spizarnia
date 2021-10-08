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
import { useSelector, useDispatch } from 'react-redux';
import useStore from "../store/useStore";
import {useEffect} from "react";

const CategoryDetail = ()=> {
    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const addProduct= useStore(state => state.addProduct);
    const unsub1 = useStore.subscribe(console.log)
    useEffect(()=>{
        fetchProducts();
    },[])

    let { categoryName } = useParams();
      console.log(categoryName);
const categories = useStore(state => state.categories);
const products = productsList.filter(product => product.categoryPath === categoryName );
const category = categories.filter(category=>category.path === categoryName);

    return (
<>
    <h2>{category[0].title}</h2>
   <div>
       <List>
           {products.map((product) => (
               <ListItem
                   key={product.id}
                   component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}
                   secondaryAction={
                       <IconButton edge="end" aria-label="delete">
                           <DeleteIcon />
                       </IconButton>
                   }
               >
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
   </div>

</>
    );
}

export default CategoryDetail;