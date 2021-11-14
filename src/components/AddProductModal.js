import {Button, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import plLocale from 'date-fns/locale/pl';
import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";
import {useParams} from "react-router-dom";
import {MenuItem} from "@mui/material";
import AutocompleteCategoriesTitle from "./AutocompleteCategoriesTitle";
//import slugify from "slugify";


const AddProductModal = ({open, close, isAddProductFromListCategory}) => {

    const [productName, setProductName] = useState('');
    const addProduct = useStore(state => state.addProduct);
    const [quantity, setQuantity] = useState("1");
    const [value, setValue] = React.useState(new Date());


    const [capacityValue, setCapacityValue] = React.useState("1");
    const [unit, setUnit] = React.useState('gr');
    const maxWidth400 = useMediaQuery('(max-width:400px)');
    const [selectedNewCategory, setSelectedNewCategory] = useState('');
    const getCategoryByPath = useStore(state => state.getCategoryByPath);
    const [category, setCategory] = React.useState("");

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
        console.log(categoryName);
        let mounted = true; //bo próba zmaiany stanu na odmontowanym komponencie
        const initialState = {loading: false, categoryName: "", category: null};
        if (categoryName) {
            getCategoryByPath(categoryName).then(category => {
                if (mounted) {
                    setCategory(category);
                }
            });
        } else {
            return initialState;
        }
        return () => mounted = false;
    }, [categoryName, selectedNewCategory, getCategoryByPath]);
    return (
        <>
            <Modal sx={{zIndex: '1200'}}
                   open={open}
                   onClose={close}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h6"
                                sx={{width: "80%", marginLeft: "10%"}}>
                        Dodaj nowy produkt
                    </Typography>
                    {isAddProductFromListCategory ?
                        <Box sx={{mt: 2, mb: 3, width: "80%", marginLeft: "10%"}}>
                            <AutocompleteCategoriesTitle labelForAddModal="true"
                                                         setSelectedNewCategory={setSelectedNewCategory}
                                                         editCategory={false}/>
                        </Box>
                        :
                        <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                            <TextField
                                sx={{width: "80%", marginLeft: "10%"}}
                                id="outlined-read-only-input"
                                label="Nazwa kategorii"
                                value={category.title}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>}

                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                        <TextField id="standard-basic" label="Nazwa produktu" variant="standard"
                                   onChange={e => setProductName(e.target.value)}
                                   sx={{width: "80%", marginLeft: "10%"}}/>
                    </Box>
                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3, width: "100%"}}>
                        <TextField id="standard-basic" label="Pojemność" variant="standard"
                                   onChange={e => setCapacityValue(e.target.value)}
                                   sx={{width: "35%", marginLeft: "10%"}}/>
                        <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
                                   id="standard-select-currency"
                                   select
                                   label="Jednostka"
                                   value={unit}
                                   onChange={e => setUnit(e.target.value)}
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
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}
                                                                    sx={{width: "80%", marginLeft: "10%"}}/>}
                            />

                        </LocalizationProvider>
                    </Box>
                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                        <TextField
                            sx={{width: "80%", marginLeft: "10%"}}
                            id="outlined-number"
                            label="Ilość"
                            defaultValue={1}
                            type="number"
                            onChange={e => setQuantity(e.target.value)}

                        />
                    </Box>
                    <Button sx={{marginLeft: "10%"}} onClick={() => {

                        addProduct({
                            "name": productName,
                            // "path": slugify(productName, "_"),
                            // "categoryPath": categoryName ? categoryName : selectedNewCategory.path,
                            "capacity": parseInt(capacityValue),
                            "unit": unit,
                            "quantity": parseInt(quantity),
                            "expireDate": value,
                            "categoryId": categoryName ? category.id : selectedNewCategory.id


                        });

                        close();

                    }}>Dodaj produkt</Button>
                </Box>

            </Modal>
        </>
    )
}

export default AddProductModal;