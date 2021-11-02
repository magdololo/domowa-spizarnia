import * as React from 'react';
import List from '@mui/material/List';
import {Link, useParams} from "react-router-dom";
import useStore from "../store/useStore";
import {useEffect} from "react";
import ProductListItem from "../components/ProductListItem";
import AppBarBottom from "../components/AppBarBottom";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";



const CategoryDetail = ()=> {

    const productsList = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const categoryList = useStore(state => state.categories);
    let { categoryName } = useParams();
    const fetchCategories = useStore(state => state.fetch);

    useEffect(() => {
        fetchCategories();


    },[]);
    useEffect(()=>{
        fetchProducts();

    },[categoryName]);

    console.log(productsList);

    console.log(categoryList)
    let category =  categoryList.filter(categoryItem => categoryItem.path === categoryName );
    console.log(category);
    category = category[0];
    console.log(categoryName);


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
               <div>
                   <List sx ={{paddingBottom: '90px'}}>
                       {products.map((product) => (
                        <ProductListItem key={product.id} product={product} component={(props)=> <Link {...props} to={'/'+product.categoryPath+'/'+product.path} />}/>
                       ))}

                   </List>
                   <EditProductModal categories={categoryList}/>
                   <AddProductModal />
                   <AppBarBottom/>
               </div>

            </>
    );
}

export default CategoryDetail;