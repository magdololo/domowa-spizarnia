import ReturnToCategoryList from "../components/ReturnToCategoryList";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ProductListItem from "../components/ProductListItem";
import { useHistory} from "react-router-dom";
import EditProductModal from "../components/EditProductModal";
import AppBarBottom from "../components/AppBarBottom";
import * as React from "react";
import {useMediaQuery} from "@mui/material";
import useStore from "../store/useStore";


const SearchResults =()=>{
    const history = useHistory();
    const minWidth900 = useMediaQuery('(min-width:900px)');

    const productsList = useStore(state => state.storage);
    const searchedProduct = useStore(state=> state.searchedProduct);
    const searchedAllProducts = useStore(state=>state.searchedProducts)

    if(searchedProduct.length === 0 && searchedAllProducts.length === 0){
        history.push("/")
    }
    const searchedProductList = productsList.filter(product=> product.id === searchedProduct[0]);

console.log(searchedProductList)
console.log(searchedAllProducts.length)
    return(
        <>
            <div style={{ margin: "0 auto", width: minWidth900 ? '800px' : '90%'}}>
                <ReturnToCategoryList/>
                <Typography variant="h6" component="h6" sx={{textTransform: "capitalize", color: "#646670"}}>
                    Wyniki wyszukiwania
                </Typography>
                {searchedProductList.length > 0 ?
                <List sx ={{paddingBottom: '90px'}}>
                    {searchedProductList.map((product) => (
                        <ProductListItem key={product.id} product={product} />
                    ))}

                </List> : null}
                {searchedAllProducts.length > 0 ?
                    <List sx ={{paddingBottom: '90px'}}>
                        {searchedAllProducts.map((product) => (
                            <ProductListItem key={product.id} product={product} />
                        ))}

                    </List>: null}

                <EditProductModal/>

                <AppBarBottom isAddProductFromListCategory={true}/>
            </div>
        </>
    )
}
export default SearchResults;