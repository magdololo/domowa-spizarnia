import * as React from 'react';
import useStore from "../store/useStore";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useEffect} from "react";
const filter = createFilterOptions();


export default function AutocompleteWithProductsList({labelForAddModal, newProductName, setNewProductName, onChange, value}) {

    const getProductsFromProducts = useStore(state => state.fetchProducts);
    const products = useStore(state => state.products);
    const loggedInUser = useStore(state=> state.loggedInUser);
    const userId = loggedInUser.id;
    useEffect(() => {
        getProductsFromProducts(userId);

    }, [getProductsFromProducts, userId]);
    // console.log(value)
    // console.log(newProductName)

    return (
        <>
            <Autocomplete

                value={value}
                onChange={(_, data) => onChange(data)}
                inputValue={newProductName}
                onInputChange={(event, newInputValue) => {
                    setNewProductName(newInputValue);
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    // const {inputValue} = params;
                    // Suggest the creation of a new value
                    // const isExisting = options.some((option) => inputValue === option.title);
                    return filtered;
                }}
                isOptionEqualToValue={(option, value) => {
                    return(
                        option.name === value.name
                    )
                }}
                //autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
                selectOnFocus
                //clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={products}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.name;

                }}
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