import {AppBar, useMediaQuery} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import AddProductModal from "./AddProductModal";
import * as React from "react";
import { styled } from '@mui/material/styles';
import Fab from "@mui/material/Fab";
import BottomHamburgerMenu from "./BottomHamburgerMenu";
import useStore from "../store/useStore";
import {useEffect} from "react";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {useForm, Controller} from "react-hook-form";
import {useHistory} from "react-router-dom";


const AppBarBottom = ({isAddProductFromListCategory, productDictionary}) =>{
    const filter = createFilterOptions();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)')
    const setSearchedProduct = useStore(state=>state.setSearchedProduct)
    const user = useStore(state=>state.loggedInUser);
    const userId = user.uid;
    const getUserProducts = useStore(state => state.getProductsOfUser);//tu do storage wrzucaja sie produkty danego uzytkownika
    const productsList = useStore(state => state.storage);
    const searchedProduct = useStore(state=>state.searchedProduct);
    const {handleSubmit, control, reset, setValue} = useForm( {mode: 'onBlur'});
    const searchedAllProducts = useStore(state=>state.setSearchedProducts)

    const Button = styled(Fab)(({ theme }) => ({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        right: 20,
        width: 90,

        lineHeight: '1.15',
        [theme.breakpoints.up('sm')]: {

            right: 20,
            width: '90',
            lineHeight: '1.25',
        },
        [theme.breakpoints.up('md')]: {
            right: 20,
            width: '90',
            lineHeight: '1.75',
        },

    }));


    useEffect(() => {
        getUserProducts(userId);
    },[getUserProducts, userId]);

    //const products = productsList.filter((product=>product.categoryId === category.id));

    if (productsList != null && productsList.length >= 2 ) {
        productsList.sort((a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            if (a < b) return -1;//keep a b
            if (a > b) return 1;//switch places b a
            return 0
        })

    }
    let history = useHistory();

    //
    useEffect(()=>{
        if(searchedProduct && typeof searchedProduct !== "string") {
            //setValue('productName', product.name);
            setValue('searchProduct', null);

        }
    }, [searchedProduct, setValue]);
    // 
    const onSubmit = data => {
          
        reset();
    }
    return(
        <>
            <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 , backgroundColor: 'white'}}>
                <Toolbar sx={{width: minWidth900 ? '800px' : '90%', margin: '0 auto', color: 'gray'}}>
                    <BottomHamburgerMenu/>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                             <Controller
                                 name="searchProduct"
                                 control={control}
                                 render={({field: {onChange, value}, fieldState: {error}}) => (
                                     <Autocomplete
                                         value={value}
                                         onChange={(_, data) => {
                                             
                                             if(typeof data === "object" && data !== null){
                                                 setSearchedProduct(data.id);
                                             } else {
                                                 searchedAllProducts(data)
                                             }
                                             onChange(data);
                                             reset();
                                             history.push('/search');
                                         }}
                                         filterOptions={(options, params) => {
                                             const filtered = filter(options, params);
                                             return filtered;
                                         }}
                                         isOptionEqualToValue={(option, value) => {
                                             return option.name === value.name
                                         }}
                                         clearOnEscape={true}
                                         freeSolo
                                         //selectOnFocus
                                         autoSelect
                                         handleHomeEndKeys
                                         id="free-solo-with-text-demo"
                                         options={productsList}
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
                                         renderInput={(params) => (
                                              <TextField {...params} label="Wyszukaj produkt" type="search" variant="standard" sx={{width: "300px"}} />
                                         )}
                                     />
                                 )}
                             />

                        </form>
                    <Button color="secondary" aria-label="add" variant="extended" onClick={handleOpen} sx={{fontSize: "0.8rem", textTransform: 'none'}}>Dodaj Produkt</Button>

                        <AddProductModal open={open}  close={handleClose}  isAddProductFromListCategory={isAddProductFromListCategory} defaultProducts={productDictionary}/>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppBarBottom;