import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import useStore from "../store/useStore";
import {useParams} from "react-router-dom";

const filter = createFilterOptions();

export default function AutocompleteCategoriesTitle({
                                                        labelForAddModal,
                                                        setSelectedNewCategory,
                                                        editCategory
                                                    }) {

    const [value, setValue] = React.useState(null);


    const categoryList = useStore(state => state.categories);
    let categoryListWithoutEditCategory = categoryList.filter(category => category.title !== editCategory.title);
    console.log(categoryList);
    console.log(categoryListWithoutEditCategory);
    let {categoryName} = useParams();
    console.log(categoryName);
    console.log("categoryname")

    console.log(editCategory);

    // console.log("canChangeCategory")
    // console.log(canChangeCategory)
    return (
        <Autocomplete
            // disabled={canChangeCategory}

            value={categoryName ? editCategory.title : value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string' && newValue === 'disabled') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }

                setSelectedNewCategory(newValue)
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const {inputValue} = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={editCategory ? categoryListWithoutEditCategory : categoryList}
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
            sx={{width: 300}}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label={labelForAddModal ? 'nazwa kategorii' : 'zmień kategorię'}/>
            )}
        />
    );
}


