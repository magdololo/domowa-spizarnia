import * as React from 'react';
import List from '@mui/material/List';
import {Link, useParams} from "react-router-dom";
import useStore from "../store/useStore";
import {useEffect} from "react";
import ProductListItem from "../components/ProductListItem";
import AppBarBottom from "../components/AppBarBottom";
import EditProductModal from "../components/EditProductModal";
import Typography from "@mui/material/Typography";
import {useMediaQuery} from "@mui/material";
import ReturnToCategoryList from "../components/ReturnToCategoryList";




const CategoryDetail = ()=> {
    const user = useStore(state=>state.loggedInUser);
    const productsList = useStore(state => state.storage);
    const getProductsOfStorage = useStore(state => state.getProductsOfUser);
    let { categoryName } = useParams();
    const minWidth900 = useMediaQuery('(min-width:900px)');
    const getCategoryByPath= useStore(state=> state.getCategoryByPath);
    const [category, setCategory] = React.useState("");
    const userId = user.id

    useEffect(() => {
        console.log(categoryName);
        getCategoryByPath(categoryName).then(category => {
            setCategory(category)
        });
        getProductsOfStorage();
    },[categoryName, category.id, getCategoryByPath, getProductsOfStorage]);


    console.log(productsList)
  console.log(user.id)
    const productsOfUser = productsList.filter(product => product.userId === userId);
    const products = productsOfUser.filter(product => product.categoryId === category.id );

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

               <div style={{ margin: "0 auto", width: minWidth900 ? '800px' : '90%'}}>
                   <ReturnToCategoryList/>
                   <Typography variant="h6" component="h6" sx={{textTransform: "capitalize", color: "#646670"}}>
                       {category.title}
                   </Typography>
                   <List sx ={{paddingBottom: '90px'}}>
                       {products.map((product) => (
                        <ProductListItem key={product.id} product={product} component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}/>
                       ))}

                   </List>
                   <EditProductModal/>

                   <AppBarBottom isAddProductFromListCategory={false}/>
               </div>

            </>
    );
}

export default CategoryDetail;