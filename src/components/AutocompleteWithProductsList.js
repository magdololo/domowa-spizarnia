import * as React from 'react';
import useStore from "../store/useStore";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useEffect} from "react";
const filter = createFilterOptions();


export default function AutocompleteWithProductsList({labelForAddModal, newProductName, setNewProductName, onChange, value, setProduct, loggedInUser}) {

    const getAllProducts = useStore(state => state.fetchProducts);
    const products = useStore(state => state.products);

    if (products.length >= 2 ) {
        products.sort((a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            if (a < b) return -1;//keep a b
            if (a > b) return 1;//switch places b a
            return 0
        })

    }

    const userId = loggedInUser.uid;
    useEffect(() => {
        getAllProducts(loggedInUser);

    }, [getAllProducts, userId,loggedInUser]);

    

    return (

            <>
            <Autocomplete

                value={value}
                onChange={(_, data) => {

                    setNewProductName(data);
                    setProduct(data);
                    onChange(data);

                }
                }
                filterOptions={(options, params) => {
                    
                    
                    const filtered = filter(options, params);
                    
                    return filtered;
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.name === value.name
                }}
                autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={products}
                getOptionLabel={option => option.name || option}
                renderOption={(props, option) => <li {...props}>{option.name} {option.capacity} {option.unit}</li>}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label={labelForAddModal} />
                )}

            />


        </>
    );
}
//