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


const CategoryDetail = ()=> {
    const categoryList = useSelector((state)=> state.storeroom.categories);

    const products = useSelector((state)=> state.storeroom.products);

    let { categoryName } = useParams();
      console.log(categoryName);
const productList = products.filter(product => product.categoryPath === categoryName);
console.log(productList);
const category = categoryList.filter(category => category.path === categoryName );

    return (
<>

    <h2>{category[0].title}</h2>

   <div>
       <List>
           {productList.map((product) => (
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