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

const EditProductModal =()=>{

    const setEditProductModalOpen = useStore(state=>state.setEditProductModalOpen);
    const updateProduct = useStore(state=>state.updateProduct);
    const [newProductName,setNewProductName] = useState('');
    const [newCapacity, setNewCapacity] = useState(1);
    const [newQuantity, setNewQuantity] = useState(1);
    const [newExpireDate, setNewExpireDate] = useState( "");
    const [unit, setUnit] = useState('gr');
    const [selectedNewCategory, setSelectedNewCategory] = useState('');
    const getCategoryByPath = useStore(state=>state.getCategoryByPath);
    const [category, setCategory] = React.useState("");
    console.log(selectedNewCategory);
    const  editModalOpen = useStore(state=>state.editModalOpen);
    const editProduct = useStore(state=>state.editProduct);
    console.log('editProduct')
    console.log(editProduct)
    const handleClose = () => {
        setEditProductModalOpen(false);
    }
    useEffect(()=>{
        console.log(editProduct.name)//po wybraniu categorii tytul
        setNewProductName(editProduct.name);
        setNewCapacity(editProduct.capacity);
        setNewQuantity(editProduct.quantity);
        setNewExpireDate(editProduct.expireDate);

    }, [editProduct]);
    console.log(editProduct);

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
    console.log(categoryName);

    useEffect(() => {
        console.log(categoryName);
        getCategoryByPath(categoryName).then(category => {
            setCategory(category)
        });
    },[categoryName, getCategoryByPath]);
    console.log("name_path_id_newId")
    console.log(categoryName);
    console.log(category.path);
    console.log(category.id);
    console.log(selectedNewCategory.id);

    return(
        <>
        <Modal sx={{zIndex: '1200'}}
               open={editModalOpen}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h6" sx={{width: "80%", marginLeft: "10%"}}>
                    Edytuj produkt
                </Typography>
                <Box sx={{mt: 2, mb: 3, width: "80%", marginLeft: "10%"}}>
                <AutocompleteCategoriesTitle setSelectedNewCategory={setSelectedNewCategory} editCategory={category}/> {/*canChangeCategory={false}*/}
                </Box>
                <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <TextField id="standard-basic" label="Nazwa produktu" variant="standard" value={newProductName} onChange={ e => setNewProductName(e.target.value)} sx={{width: "80%", marginLeft: "10%"}}/>
                </Box>
                <Box id="modal-modal-description"  sx={{mt: 2, mb: 3, width: "100%"}}>
                    <TextField id="standard-basic" label="Pojemność" variant="standard" value={newCapacity} onChange={ e => setNewCapacity(e.target.value)} sx={{width: "35%", marginLeft: "10%"}}/>
                    <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
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

                </Box>
                <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                    <MobileDatePicker
                        mask={'__.__.____'}
                        label="Data ważności"
                        value={newExpireDate}
                        onChange={(newExpireDate) => {
                            setNewExpireDate(newExpireDate);
                        }}
                        renderInput={(params) => <TextField {...params}  sx={{width: "80%", marginLeft: "10%"}}/>}
                    />

                </LocalizationProvider>
                </Box>
                <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <TextField
                        sx={{width: "80%", marginLeft: "10%"}}
                        id="outlined-number"
                        label="Ilość"
                        value={newQuantity}
                        type="number"
                        onChange={ e => setNewQuantity(e.target.value)}

                    />
                </Box>
                <Button sx={{ marginLeft: "10%"}} onClick={(e)=> {
                    e.preventDefault();
                    let idNewCategory = selectedNewCategory.id ? selectedNewCategory.id : category.id;
                    updateProduct(editProduct.id ,newProductName, newCapacity, unit, newQuantity, newExpireDate, idNewCategory);
                    handleClose();

                }}>Edytuj produkt</Button>
            </Box>

        </Modal>
        </>
    )
}

export default EditProductModal;



