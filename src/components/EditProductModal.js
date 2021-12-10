import useStore from "../store/useStore";
import {useEffect, useState} from "react";
import {Button, MenuItem, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import plLocale from "date-fns/locale/pl";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AutocompleteCategoriesTitle from "./AutocompleteCategoriesTitle";
import {useParams} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";

const EditProductModal =()=>{


    const setEditProductModalOpen = useStore(state=>state.setEditProductModalOpen);
    const updateProduct = useStore(state=>state.updateProduct);
    const [newEditProduct] = useState({});
    const getCategoryByPath = useStore(state=>state.getCategoryByPath);
    const [editCategory, setEditCategory] = React.useState(null);
    const  editModalOpen = useStore(state=>state.editModalOpen);
    const editProduct = useStore(state=>state.editProduct);
    const [selectedNewCategory, setSelectedNewCategory] = useState(null);
    const handleClose = () => {
        setEditProductModalOpen(false);
    }
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
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "75%",
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 1200,
    }
    let { categoryName } = useParams();
    const loggedInUser = useStore(state=> state.loggedInUser);
    const userId = loggedInUser.id;
    useEffect(() => {
        getCategoryByPath(categoryName).then(category => {
            setEditCategory(category)
        });
    },[categoryName, getCategoryByPath,]);

    const { handleSubmit, control , setValue} = useForm( {mode: 'onBlur'});
    useEffect(()=>{
            //setNewEditProduct(editProduct);
            setValue('newProductName', editProduct.name);
            setValue('newCapacity', editProduct.capacity);
            setValue('newExpireDate', editProduct.expireDate);
            setValue('newQuantity', editProduct.quantity);
            setValue('newUnit', editProduct.unit);
            setValue('newCategoryName', editCategory);

    }, [editProduct, editCategory, setValue]);


    const onSubmit = async (data) => {
         updateProduct({
            "id": editProduct.id,
            "userId": editProduct.userId ,
            "productId": editProduct.productId,
            "name": data.newProductName,
            "capacity": parseInt(data.newCapacity),
            "unit":  data.newUnit,
            "quantity": parseInt(data.newQuantity),
            "expireDate":  data.newExpireDate,
            "categoryId": selectedNewCategory.id
        }, userId, editProduct)
        handleClose();
    };

    return(
        <>
        <Modal sx={{zIndex: '1200'}}
               open={editModalOpen}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"

        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h6" sx={{width: "80%", marginLeft: "10%"}}>
                    Edytuj produkt
                </Typography>
                <Box sx={{mt: 2, mb: 3}}>
                    <Controller
                        name="newCategoryName"
                        control={control}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                        <AutocompleteCategoriesTitle
                            onChange= {onChange}
                            value={value}
                            setEditCategory={setEditCategory}
                            setSelectedNewCategory={setSelectedNewCategory}
                            />
                            )}
                    />
                </Box>
                <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <Controller
                        name="newProductName"
                        control={control}
                        defaultValue={newEditProduct ? newEditProduct.name : ''}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField sx={{width: "80%", marginLeft: "10%"}}
                            id="standard-basic"
                            label="Nazwa produktu"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                                   // InputProps={{
                                   //     readOnly: true,
                                   // }}                                   I
                            // error={!!error}
                            // helperText={error ? error.message : null}
                                   type= "text"
                                   //disabled={true}
                        />
                        )}/>
                </Box>
                <Box id="modal-modal-description"  sx={{mt: 2, mb: 3, width: "100%"}}>
                    <Controller
                        name="newCapacity"
                        control={control}
                        defaultValue={newEditProduct ? newEditProduct.capacity : ""}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField sx={{width: "35%", marginLeft: "10%"}}
                        id="standard-basic"
                        label="Pojemność"
                        variant="standard"
                        value={value}
                        onChange={onChange}

                    />
                        )}/>
                    <Controller
                    name="newUnit"
                    control={control}
                    defaultValue={newEditProduct ? newEditProduct.unit: ""}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
                               id="standard-select-currency"
                               select
                               label="Jednostka"
                               value={value}
                               onChange={onChange}
                               variant="standard"
                    >
                        {units.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                    )}/>
                </Box>
                <Box>
                    <Controller
                        name="newExpireDate"
                        control={control}
                        defaultValue={newEditProduct ? newEditProduct.expireDate : ""}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                    <MobileDatePicker
                        mask={'__.__.____'}
                        label="Data ważności"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => <TextField {...params}  sx={{width: "80%", marginLeft: "10%"}}/>}
                    />
                    </LocalizationProvider>
                        )}
                    />
                </Box>
                <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <Controller
                        name="newQuantity"
                        control={control}
                        defaultValue={newEditProduct ? newEditProduct.quantity : ""}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField sx={{width: "80%", marginLeft: "10%"}}
                        id="outlined-number"
                        label="Ilość"
                        value={value}
                        type="number"
                        onChange={onChange}
                    />
                        )}
                    />
                </Box>
                <Button sx={{ marginLeft: "10%"}} type="submit" variant="contained" color="primary" >Edytuj produkt</Button>
            </Box>
            </form>
        </Modal>
        </>
    )
}

export default EditProductModal;



