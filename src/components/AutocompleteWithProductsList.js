import * as React from 'react';
import useStore from "../store/useStore";
import {Autocomplete, createFilterOptions} from "@mui/material";
import TextField from '@mui/material/TextField';
import {useEffect} from "react";

const filter = createFilterOptions();
export default function AutocompleteWithProductsList({labelForAddModal, setSelectedNewProductName, setProduct}) {

    const getProductsFromProducts = useStore(state => state.fetchProducts);
    const products = useStore(state => state.products);
    console.log(products);
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        getProductsFromProducts();

    }, [getProductsFromProducts]);
    console.log(value)


    return (
        <>
            <Autocomplete

                value={value}
                onChange={(event, newValue) => {
                    setProduct(value);
                    if (typeof newValue === 'string' && newValue === 'disabled') {
                        setValue({
                            name: newValue,
                        });
                        setProduct({
                            product: newValue

                        })
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        console.log("setvalue")
                        setValue({

                            name: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                    console.log("setSelectedNewProductName")
                    console.log(newValue)
                    setSelectedNewProductName(newValue)
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const {inputValue} = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            name: `Add "${inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                autoSelect
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
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                sx={{width: 300}}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label={labelForAddModal}/>
                )}

            />

        </>
    );
}