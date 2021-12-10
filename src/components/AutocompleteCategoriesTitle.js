import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import useStore from "../store/useStore";
import {useEffect} from "react";
const filter = createFilterOptions();

export default function AutocompleteCategoriesTitle({labelForAddModal, value, onChange, setSelectedNewCategory}) {
     const categoryList = useStore(state => state.categories);
     console.log(categoryList)
    // console.log(value)
    useEffect( ()=>{

        if(value) {
            setSelectedNewCategory(value)
        }
    }, [value, setSelectedNewCategory]);

    return (
        <Autocomplete

            value={value}
            onChange={(_, data) => onChange(data)}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
            }}
            isOptionEqualToValue={(option, value) => {
                return option.title === value.title
            }}
            selectOnFocus
            //clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={categoryList}
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
                return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            renderInput={(params) => (
                <TextField {...params} label={labelForAddModal ? 'nazwa kategorii' : 'zmień kategorię'}   sx={{width: "80%", marginLeft: "10%"}}/>
            )}

        />
    );
}
//

