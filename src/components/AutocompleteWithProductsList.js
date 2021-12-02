import * as React from 'react';
import useStore from "../store/useStore";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useEffect} from "react";
const filter = createFilterOptions();

export default function AutocompleteWithProductsList({labelForAddModal, setProduct, setNewProductName}) {

    const getProductsFromProducts = useStore(state => state.fetchProducts);
    const products = useStore(state => state.products);
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        getProductsFromProducts();

    }, [getProductsFromProducts]);

    useEffect(()=>{

        if(value)
        setNewProductName(value)
    },[setNewProductName, value])
//value to caly obiekt produktu wybranego z products gdy wybieram z listy i wpisuje sie w pole
    //value jest tylko name gdy schodze z pola
    return (
        <>
            <Autocomplete

                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                            name: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue(
                            {
                            name: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                        if(newValue && typeof newValue !== "string")
                            setProduct(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const {inputValue} = params;
                    //Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            name: `Add "${inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
                selectOnFocus
                disableClearable
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
                renderOption={(props, option) => <li {...props}>{option.name} </li>}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label={labelForAddModal} />
                )}

            />

        </>
    );
}
//