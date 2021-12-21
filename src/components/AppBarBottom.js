import {AppBar, useMediaQuery} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
//import SearchIcon from "@mui/icons-material/Search";
import AddProductModal from "./AddProductModal";
import * as React from "react";
import { styled, alpha } from '@mui/material/styles';
import Fab from "@mui/material/Fab";
import Button from '@mui/material/Button';
import BottomHamburgerMenu from "./BottomHamburgerMenu";
import useStore from "../store/useStore";
import {useEffect} from "react";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {useForm, Controller} from "react-hook-form";
import {useHistory} from "react-router-dom";
import InputBase from  '@mui/material/InputBase';

const AppBarBottom = ({isAddProductFromListCategory}) =>{
    const filter = createFilterOptions();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)')
    const setSearchedProduct = useStore(state=>state.setSearchedProduct)

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
    // const Search = styled('div')(({ theme }) => ({
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: alpha(theme.palette.common.white, 0.15),
    //     '&:hover': {
    //         backgroundColor: alpha(theme.palette.common.white, 0.25),
    //     },
    //     marginRight: theme.spacing(2),
    //     marginLeft: 0,
    //     width: '66%',
    //     [theme.breakpoints.up('sm')]: {
    //         marginLeft: theme.spacing(3),
    //         width: '90',
    //     },
    // }));
    // const SearchIconWrapper = styled('div')(({ theme }) => ({
    //     padding: theme.spacing(0, 2),
    //     height: '50%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(0, 2, 0, 6),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(1)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));
    const StylesInput = styled(TextField)(({ theme }) =>({
        underline: {
            "&&&:before": {
                borderBottom: "none"
            },
            "&&:after": {
                borderBottom: "none"
            }
        }
    }));


    const user = useStore(state=>state.loggedInUser);
    const userId = user.id;
    const getUserProducts = useStore(state => state.getProductsOfUser);//tu do storage wrzucaja sie produkty danego uzytkownika
    const productsList = useStore(state => state.storage);
    const searchedProduct = useStore(state=>state.searchedProduct);
    const {handleSubmit, control, reset, setValue} = useForm( {mode: 'onBlur'});

    const searchedAllProducts = useStore(state=>state.setSearchedProducts)

    useEffect(() => {
        getUserProducts(userId);
    },[getUserProducts, userId]);

    //const products = productsList.filter((product=>product.categoryId === category.id));

    if (productsList.length >= 2 ) {
        productsList.sort((a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            if (a < b) return -1;//keep a b
            if (a > b) return 1;//switch places b a
            return 0
        })

    }
    let history = useHistory();

    //console.log(searchedProduct)
    useEffect(()=>{
        if(searchedProduct && typeof searchedProduct !== "string") {
            //setValue('productName', product.name);
            setValue('searchProduct', null);

        }
    }, [searchedProduct, setValue]);
    console.log(searchedProduct);
    const onSubmit = data => {
          console.log(data)
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
                                             console.log(data)
                                             if(typeof data === "object" && data !== null){
                                                 setSearchedProduct(data.id);
                                             } else {
                                                 console.log(data)
                                                 searchedAllProducts(data)
                                             }
                                             onChange(data);
                                             reset();
                                             //history.push('/');
                                             history.push('/search');
                                         }}
                                         //filterOptions={filterOptions}
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
                                             // <StyledInputBase
                                             //     ref={params.InputProps.ref}
                                             //     inputProps={params.inputProps}
                                             //     placeholder="Znajdź produkt…"
                                             //     {...params}
                                             // />
                                              <TextField {...params} label="Wyszukaj produkt" type="search" variant="standard" sx={{width: "300px"}} />

                                             // <TextField {...params} label="Wyszukaj produkt"/>

                                         )}

                                     />
                                 )}
                             />

                        </form>
                    {/*<Fab color="primary" aria-label="add">*/}
                    {/*    <Button color="secondary" aria-label="add" variant="extended" onClick={handleOpen} sx={{fontSize: "0.8rem", textTransform: 'none'}}>Dodaj Produkt</Button>*/}
                    {/*</Fab>*/}
                    <Button color="secondary" aria-label="add" variant="extended" onClick={handleOpen} sx={{fontSize: "0.8rem", textTransform: 'none'}}>Dodaj Produkt</Button>

                        <AddProductModal open={open}  close={handleClose}  isAddProductFromListCategory={isAddProductFromListCategory}/>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppBarBottom;