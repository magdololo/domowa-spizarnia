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

const CategoryDetail = ()=> {

    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);

    useEffect(()=>{
        fetchProducts();
    },[])
    console.log(productsList);
    let { categoryName } = useParams();
      console.log(categoryName);
const categories = useStore(state => state.categories);
const products = productsList.filter(product => product.categoryPath === categoryName );
const category = categories.filter(category=>category.path === categoryName);
console.log(category.path);//undefined
console.log(categoryName);
    return (
<>
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