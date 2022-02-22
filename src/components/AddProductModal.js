import {Alert, Button, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import plLocale from 'date-fns/locale/pl';
import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";
import {useParams} from "react-router-dom";
import {MenuItem} from "@mui/material";
import AutocompleteCategoriesTitle from "./AutocompleteCategoriesTitle";
import {useForm, Controller} from "react-hook-form";
import AutocompleteWithProductsList from "./AutocompleteWithProductsList";



const AddProductModal = ({open, close, isAddProductFromListCategory}) => {

    const addProduct = useStore(state => state.addProduct);
    const maxWidth400 = useMediaQuery('(max-width:400px)');
    const [selectedNewCategory, setSelectedNewCategory] = useState("");
    const [product, setProduct] = useState({});
    const getCategoryByPath = useStore(state => state.getCategoryByPath);
    const [category, setCategory] = React.useState("");
    const loggedInUser = useStore(state=> state.loggedInUser);
    const userId = loggedInUser.uid;
    const [newProductName, setNewProductName] = useState(null);
    const requiredCategoryId = useStore(state=>state.requiredCategoryId);
    const [errorMessage,setErrorMessage] = useState('');
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: maxWidth400 ? 340 : 400,
        backgroundColor: '#fff',
        border: '1px solid #000',
        boxShadow: 24,
        p: '10px 4px',
        zIndex: 1200,
    };
    const units = [
        {
            value: 'gr',

        },
        {
            value: 'ml',

        },
        {
            value: 'kg',
        },
        {
            value: 'szt',
        },
        {
            value: 'l',

        }

    ];



    let {categoryName} = useParams();
    useEffect(() => {
        let category ={}
        if(categoryName){

            category = getCategoryByPath(categoryName)

            setCategory(category)}
    },[categoryName,setCategory, getCategoryByPath]);


    const { handleSubmit, control, setValue, reset} = useForm();

    useEffect(()=>{
        if(product && typeof product !== "string") {
            //setValue('productName', product.name);
            setValue('capacity', product.capacity);
            setValue('unit', product.unit);
        }
    }, [product, setValue]);
    const closeModal =()=>{
        setErrorMessage('');
        reset();
        close();
    }
    const onSubmit = data => {
        if(newProductName !== null && data.capacity !== "" && data.unit !== "" && data.quantity > 0 ){
            addProduct({
                "name":  typeof product ==="object" ? product.name : product,//product && Object.keys(product).length !== 0? product.name : newProductName,
                "capacity": parseInt(data.capacity),
                "unit": data.unit,
                "quantity": parseInt(data.quantity),
                "expireDate": data.expireDate,
                "categoryId": categoryName  ? category.id : selectedNewCategory.hasOwnProperty("id") ? selectedNewCategory.id : requiredCategoryId,
                "userId": userId
            },userId, product, categoryName  ? category.id : selectedNewCategory.hasOwnProperty("id") ? selectedNewCategory.id : requiredCategoryId);
            closeModal();
        }else{
            if(newProductName === null){
                setErrorMessage("Nazwa wymagana");
            } else if(data.capacity === ""){
                setErrorMessage("Pojemność wymagane");
            }else if(data.unit === ""){
                setErrorMessage("Jednostka wymagana");
            }else if(data.quantity <= 0){
                setErrorMessage("Minimalna ilość 1")
            }else{
                setErrorMessage(errorMessage)
            }
        }

    };

    return (
        <>
            <Modal sx={{zIndex: '1200'}}
                   open={open}
                   onClose={close}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h6"
                                sx={{width: "80%", marginLeft: "10%"}}>
                        Dodaj nowy produkt
                    </Typography>

                    {isAddProductFromListCategory ?
                        <Box sx={{mt: 2, mb: 3}}>
                            <Controller
                                name="categoryName"
                                control={control}
                                defaultValue={null}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <AutocompleteCategoriesTitle
                                        labelForAddModal="true"
                                        label="Nazwa kategorii"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        type= "text"
                                        editCategory={false}
                                        setSelectedNewCategory={setSelectedNewCategory}

                                    />
                                )} />
                        </Box>
                        :
                        <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                            <Controller
                                name="categoryName"
                                control={control}
                                defaultValue=""
                                render={({field: { value}, fieldState: {error}}) => (
                                    <TextField
                                        sx={{width: "80%", marginLeft: "10%"}}
                                        //id="outlined-read-only-input"
                                        label="Nazwa kategorii"
                                        value={category.title}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        // error={!!error}
                                        // helperText={error ? error.message : null}
                                        type= "text"
                                        disabled={true}
                                     />
                             )}

                            />
                        </Box>}
                        <Box id="modal-modal-description" sx={{mt: 2, mb: 3,width: "80%", marginLeft: "10%"}}>

                            {/*<AutocompleteWithProductsList/>*/}
                            <Controller
                                name="productName"
                                control={control}
                                render={({field: {onChange, value}, fieldState: {error}}) => (

                                    <AutocompleteWithProductsList
                                        labelForAddModal="Nazwa produktu"
                                        label="Nazwa produktu"
                                        value={value}
                                        onChange={onChange}
                                        type= "text"
                                        setProduct={setProduct}
                                        newProductName={newProductName}
                                        setNewProductName={setNewProductName}
                                        loggedInUser={loggedInUser}

                                        />

                                )}
                               />
                        </Box>
                        <Box id="modal-modal-description" sx={{mt: 2, mb: 3, width: "100%"}}>
                            <Controller
                                name="capacity"
                                control={control}
                                defaultValue= ""//{product ? product.capacity : "100"}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                 <TextField  sx={{width: "35%", marginLeft: "10%"}}
                                            label="Pojemność"
                                             variant="standard"
                                             value={ value}
                                             onChange={onChange}
                                             error={!!error}
                                             helperText={error ? error.message : null}
                                             type="number"
                                  />
                                )}
                            />
                            <Controller
                                name="unit"
                                control={control}
                                defaultValue=""//{product ? product.unit : "gr"}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
                                   //id="standard-select-currency"
                                           select
                                           label="Jednostka"
                                           onChange={onChange}
                                           value={value}
                                           error={!!error}
                                           helperText={error ? error.message : null}
                                           variant="standard"
                                           type="text"
                                >
                            {units.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                                 </TextField>
                                )}
                            />
                    </Box>

                    <Box>
                        <Controller
                            name="expireDate"
                            control={control}
                            defaultValue={null}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                             <LocalizationProvider
                                 dateAdapter={AdapterDateFns} locale={plLocale}>
                                <DatePicker
                                mask={'__.__.____'}
                                label="Data ważności"
                                value={value}
                                onChange={onChange}
                                renderInput={(params) => <TextField {...params} sx={{width: "80%", marginLeft: "10%"}} />}/>
                             </LocalizationProvider>
                            )}
                        />
                    </Box>

                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                        <Controller
                            name="quantity"
                            control={control}
                            defaultValue="1"
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                     sx={{width: "80%", marginLeft: "10%"}}
                                    //id="outlined-number"
                                    label="ilość"
                                    type="number"
                                     value={value}
                                     onChange={onChange}
                                     error={!!error}
                                     helperText={error ? error.message : null}

                                />
                            )}
                        />
                    </Box>
                    {errorMessage !== ''? <Alert severity="error">{errorMessage}</Alert>:null}
                    <Button sx={{marginLeft: "10%"}} type="submit" variant="contained" color="primary"  >Dodaj produkt</Button>
                </Box>
                </form>
            </Modal>
        </>
    )
}

export default AddProductModal;