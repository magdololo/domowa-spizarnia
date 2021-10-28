import {Button, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import plLocale from 'date-fns/locale/pl';
import slugify from "slugify";
import * as React from "react";
import {useState} from "react";
import useStore from "../store/useStore";
import {useParams} from "react-router-dom";
import {MenuItem} from "@mui/material";


const AddProductModal=({open, close})=>{
    const [productName,setProductName] = useState('');
    const addProduct= useStore(state => state.addProduct);
    const [quantity, setQuantity] = useState(1);
    const [value, setValue] = React.useState(new Date());
    const [capacityValue, setCapacityValue] = React.useState(1);
    const [unit, setUnit] = React.useState('gr');
    const maxWidth400 = useMediaQuery('(max-width:400px)');



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
      }

  ];
        let { categoryName } = useParams();
        console.log(categoryName);
        console.log(units);
    return (
        <>
        <Modal sx={{zIndex: '1200'}}
               open={open}
               onClose={close}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Dodaj nowy produkt
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                    <TextField id="standard-basic" label="Nazwa produktu" variant="standard" onChange={ e => setProductName(e.target.value)} />
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 3, width: "50%"}}>
                    <TextField id="standard-basic" label="Pojemność" variant="standard" defaultValue={capacityValue} onChange={ e => setCapacityValue(e.target.value)} sx={{ width: "59%", paddingRight:"1%"}}/>
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
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                <TextField
                    id="outlined-number"
                    label="Ilość"
                    defaultValue={1}
                    type="number"
                    onChange={ e => setQuantity(e.target.value)}
                    renderInput={(params) => <TextField {...params} />}
                />
                </Typography>
                <Button onClick={()=> {

                    addProduct({
                        "name": productName,
                        "path": slugify(productName, "_"),
                        "categoryPath": categoryName,
                        "capacity": capacityValue,
                         "unit": unit,
                        "quantity": parseInt(quantity),
                        "expireDate" : value,


                    });

                    close();

                }}>Dodaj produkt</Button>
            </Box>

        </Modal>
     </>
    )
}

export default AddProductModal;