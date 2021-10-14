import {useParams} from "react-router-dom";
import {useState} from "react";
import useStore from "../store/useStore";

const ProductDetail = (primary)=> {


    const productsList = useStore(state=>state.products);

    let { productName } = useParams();
    console.log(productName);
    let product = productsList.filter(product => product.path === productName);
    product = product[0];

    return (
        <>

         <h4>{product.name}</h4>
                <p>Ilosc: {product.quantity}</p>

        </>
    );
}

export default ProductDetail;