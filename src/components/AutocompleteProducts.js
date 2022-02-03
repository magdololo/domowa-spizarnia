// import useStore from "../store/useStore";
// import {useEffect} from "react";
// import TextField from '@mui/material/TextField';
// import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
//
// const filter = createFilterOptions();
//
//
// export default function AutocompleteProducts({ onChange, value, setProduct}) {
//
//     const getProductsFromProducts = useStore(state => state.fetchProducts);
//     const products = useStore(state => state.products);
//     const loggedInUser = useStore(state=> state.loggedInUser);
//     const userId = loggedInUser.id;
//
//     useEffect(() => {
//         getProductsFromProducts(userId);
//
//     }, [getProductsFromProducts, userId]);
//
//     return(
//         <Autocomplete
//             value={value}
//             onChange={(event, newValue) => {
//                 if (typeof newValue === 'string') {
//                     setProduct({
//                         name: newValue,
//                     });
//                 } else if (newValue && newValue.inputValue) {
//                     // Create a new value from the user input
//                     setProduct({
//                         name: newValue.inputValue,
//                     });
//                 } else {
//                     setProduct(newValue);
//                 }
//             }}
//             filterOptions={(options, params) => {
//                 const filtered = filter(options, params);
//
//                 const { inputValue } = params;
//                 // Suggest the creation of a new value
//                 const isExisting = options.some((option) => inputValue === option.name);
//                 if (inputValue !== '' && !isExisting) {
//                     filtered.push({
//                         inputValue,
//                         title: `Add "${inputValue}"`,
//                     });
//                 }
//
//                 return filtered;
//             }}
//             selectOnFocus
//            //clearOnBlur
//             handleHomeEndKeys
//             id="free-solo-with-text-demo"
//             options={products}
//             getOptionLabel={(option) => {
//                 // Value selected with enter, right from the input
//                 if (typeof option === 'string') {
//                     return option;
//                 }
//                 // Add "xxx" option created dynamically
//                 if (option.inputValue) {
//                     return option.inputValue;
//                 }
//                 // Regular option
//                 return option.name;
//             }}
//             renderOption={(props, option) => <li {...props}>{option.name}</li>}
//             sx={{ width: 300 }}
//             freeSolo
//             renderInput={(params) => (
//                 <TextField {...params} label="Free solo with text demo" />
//             )}
//         />
//     );
//
// }