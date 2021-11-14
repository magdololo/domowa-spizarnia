import {useParams} from "react-router-dom";
import useStore from "../store/useStore";
import * as React from "react";

const ProductDetail = () => {


    const productsList = useStore(state => state.products);

    let {productName} = useParams();
    console.log(productName);
    let product = productsList.filter(product => product.path === productName);
    product = product[0];

    return (
        <>
            {product !== '' &&
            <>
                <h4>{product.name}</h4>
                <p>Ilość: {product.quantity}</p>
            </>
            }
        </>
    );
}

export default ProductDetail;