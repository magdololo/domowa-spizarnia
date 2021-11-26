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
    const userId = user.id;
    const getUserProducts = useStore(state => state.getProductsOfUser);//tu do storage wrzucaja sie produkty danego uzytkownika
    const productsList = useStore(state => state.storage);
    let { categoryName } = useParams();
    const minWidth900 = useMediaQuery('(min-width:900px)');
    const getCategoryByPath= useStore(state=> state.getCategoryByPath);
    const [category, setCategory] = React.useState("");


    useEffect(() => {
        console.log(categoryName);
        getCategoryByPath(categoryName).then(category => {
            setCategory(category)
        });
        getUserProducts(userId);
    },[categoryName, category.id, getCategoryByPath, getUserProducts]);


    if (productsList.length >= 2) {
        productsList.sort((a, b) => {
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
                       {productsList.map((product) => (
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