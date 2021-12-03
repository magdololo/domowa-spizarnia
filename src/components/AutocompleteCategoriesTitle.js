import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import useStore from "../store/useStore";
const filter = createFilterOptions();

export default function AutocompleteCategoriesTitle({labelForAddModal, value, onChange}) {


     const categoryList = useStore(state => state.categories);


    return (
        <Autocomplete

            value={value}
            onChange={(_, data) => onChange(data)}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
               // const {inputValue} = params;
                // Suggest the creation of a new value
               // const isExisting = options.some((option) => inputValue === option.title);
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

