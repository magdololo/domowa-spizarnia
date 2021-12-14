import ReturnToCategoryList from "../components/ReturnToCategoryList";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ProductListItem from "../components/ProductListItem";
import {Link, useHistory, useParams} from "react-router-dom";
import EditProductModal from "../components/EditProductModal";
import AppBarBottom from "../components/AppBarBottom";
import * as React from "react";
import {useMediaQuery} from "@mui/material";
import useStore from "../store/useStore";

const SearchResults =()=>{
    const history = useHistory();
    const minWidth900 = useMediaQuery('(min-width:900px)');
    const searchedProduct = useStore(state=>state.searchedProduct);
    if(searchedProduct === null){
        history.push("/")
    }
    return(
        <>
            <div style={{ margin: "0 auto", width: minWidth900 ? '800px' : '90%'}}>
                <ReturnToCategoryList/>
                <Typography variant="h6" component="h6" sx={{textTransform: "capitalize", color: "#646670"}}>
                    Wyniki wyszukiwania
                </Typography>
                <List sx ={{paddingBottom: '90px'}}>
                        <ProductListItem key={searchedProduct.id} product={searchedProduct}/>

                </List>
                <EditProductModal/>

                <AppBarBottom isAddProductFromListCategory={false}/>
            </div>
        </>
    )
}
export default SearchResults;