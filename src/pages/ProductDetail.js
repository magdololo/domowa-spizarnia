import {useParams} from "react-router-dom";
import {useState} from "react";

const ProductDetail = (primary)=> {
    const categories = [
        {
            url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Przetwory owocowe i miód',
            width: '33,3%',
            path: "przetwory_owocowe_miod"
        },
        {
            url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Mąka, Makarony, Ryże',
            width: '33,3%',
            path: "maka_makarony_ryze"
        },
        {
            url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Desery i pomoce cukiernicze',
            width: '33,3%',
            path: "./desery_pomoce_cukiernicze"
        },
        {
            url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Cukier i słodziki',
            width: '33,3%',
            path: "./cukier_słodziki"
        },
    ];

    const products = [
        {
            name: "olej kujawski",
            path: "olej_kujawski",
            categoryPath: "przetwory_owocowe_miod",
            quantity: 2,
            expireDate: "09.06.2023"
        },
        {
            name: "olej kokosowy",
            path: "olej_kokosowy",
            categoryPath: "maka_makarony_ryze",
            quantity: 5,
            expireDate: "30.12.2022"
        },
        {
            name: "olej lniany",
            path: "olej_lniany",
            categoryPath: "przetwory_owocowe_miod",
            quantity: 6,
            expireDate: "29.09.2028"
        },
        {
            name: "olej palmowy",
            path: "olej_palmowy",
            categoryPath: "przetwory_owocowe_miod",
            quantity: 8,
            expireDate: "19.08.2026"
        }

    ]

    let { productName } = useParams();
    console.log(productName);
    let product = products.filter(product => product.path === productName);
    product = product[0];

    return (
        <>

         <h4>{product.name}</h4>
                <p>Ilosc: {product.quantity}</p>

        </>
    );
}

export default ProductDetail;