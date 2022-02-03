import useStore from "../store/useStore";
import {useEffect} from "react";
import ReturnToCategoryList from "../components/ReturnToCategoryList";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ProductListItem from "../components/ProductListItem";
import {Link} from "react-router-dom";
import EditProductModal from "../components/EditProductModal";
import AppBarBottom from "../components/AppBarBottom";
import * as React from "react";
import {useMediaQuery} from "@mui/material";


const ProductsList = () => {
    const user = useStore(state=>state.loggedInUser);
    const getUserProducts = useStore(state => state.getProductsOfUser);//tu do storage wrzucaja sie produkty danego uzytkownika
    const productsList = useStore(state => state.storage);
    const minWidth900 = useMediaQuery('(min-width:900px)');

    useEffect(() => {
        getUserProducts(user.uid);

    }, [getUserProducts, user]);

    //const products = productsList.filter((product=>product.categoryId === category.id));

    if (productsList.length >= 2 ) {
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
                    Lista produktów
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
    )
}

export default ProductsList;