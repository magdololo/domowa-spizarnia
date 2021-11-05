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

    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    let { categoryName } = useParams();
    const fetchCategories = useStore(state => state.fetch);
    const minWidth900 = useMediaQuery('(min-width:900px)');
    const getCategoryByPath= useStore(state=> state.getCategoryByPath);

    let category = null;
let categoryTitle = '';
    useEffect(() => {
        console.log(productsList);
        console.log(categoryName);

        getCategoryByPath(categoryName).then(cat => {
            category = cat;
            categoryTitle = category.title;
            console.log(categoryTitle);
            console.log('categoryTitle');
        });

    },[category]);
    useEffect(()=>{
        fetchProducts();

    },[categoryName]);




    const products = productsList.filter(product => product.categoryPath === categoryName );

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
                       {categoryTitle}
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