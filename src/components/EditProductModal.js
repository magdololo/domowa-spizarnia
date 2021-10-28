import useStore from "../store/useStore";
import {useEffect, useState} from "react";
import {Button, MenuItem, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import slugify from "slugify";
import * as React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import plLocale from "date-fns/locale/pl";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

const EditProductModal =()=>{
    const setEditProductModalOpen = useStore(state=>state.setEditProductModalOpen);
    const updateProduct = useStore(state=>state.updateProduct);
    const [newProductName,setNewProductName] = useState('');
    const [newCapacity, setNewCapacity] = useState(0);
    const [newCategoryPath, setNewCategoryPath] = useState('');
    const [newQuantity, setNewQuantity] = useState(1);
    const [newExpireDate, setNewExpireDate] = useState(new Date());
    const [unit, setUnit] = useState('gr');
    const  editModalOpen = useStore(state=>state.editModalOpen);
    const editProduct = useStore(state=>state.editProduct);
    const handleClose = () => {
        setEditProductModalOpen(false);
    }
    useEffect(()=>{
        console.log(editProduct.name)//po wybraniu categorii tytul
        setNewProductName(editProduct.name);
        setNewCapacity(editProduct.capacity);
        setNewCategoryPath(editProduct.categoryPath);
        setNewQuantity(editProduct.quantity);
        setNewExpireDate(editProduct.expireDate);

    }, [editProduct]);

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

    return(
        <Modal sx={{zIndex: '1200'}}
               open={editModalOpen}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edytuj produkt
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <TextField id="standard-basic" label="Nazwa produktu" variant="standard" value={newProductName} onChange={ e => setNewProductName(e.target.value)} />
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 3, width: "50%"}}>
                    <TextField id="standard-basic" label="Pojemność" variant="standard" value={newCapacity} onChange={ e => setNewCapacity(e.target.value)} sx={{ width: "59%", paddingRight:"1%"}}/>
                    <TextField sx={{ width: "40%"}}
                               id="standard-select-currency"
                               select
                               label="Jednostka"
                               value={unit}
                               onChange={ e => setUnit(e.target.value)}
                               variant="standard"
                    >
                        {units.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>

                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                    <MobileDatePicker
                        mask={'__.__.____'}
                        label="Data ważności"
                        value={newExpireDate}
                        onChange={(newExpireDate) => {
                            setNewExpireDate(newExpireDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <TextField
                        id="outlined-number"
                        label="Ilość"
                        value={newQuantity}
                        type="number"
                        onChange={ e => setNewQuantity(e.target.value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Typography>
                <Button onClick={()=> {

                    let path= slugify(newProductName, "_")
                    updateProduct(editProduct.id ,newProductName, path, newCategoryPath, newCapacity, unit, newQuantity, newExpireDate);
                    handleClose();

                }}>Edytuj produkt</Button>
            </Box>

        </Modal>
    )
}

export default EditProductModal;



