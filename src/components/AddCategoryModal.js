import {Alert, Button, ImageListItem, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImagePickerModal from "./ImagePickerModal";
import slugify from "slugify";
import * as React from "react";
import {useState} from "react";
import useStore from "../store/useStore";

const AddCategoryModal=({open, close})=>{
    const [newCategoryName,setNewCategoryName] = useState('');
    const pickedImage = useStore(state=>state.pickedImage);
    const setPickedImage = useStore(state=>state.setPickedImage);
    const addCategory = useStore(state => state.addCategory);
    const categories = useStore(state => state.categories);
    const maxWidth400 = useMediaQuery('(max-width:400px)');
    const user = useStore(state=>state.loggedInUser);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: maxWidth400 ? 380 : 380,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 4,
        p: 4,
        zIndex: 1200,
    }
    const [errorMessage,setErrorMessage] = useState('');

    const closeModal =()=>{
        setErrorMessage('');
        setPickedImage('');
        close();
    }



        if (categories != null && categories.length >= 2) {
            
            categories.sort((a, b) => {
                a = a.title.toLowerCase();
                b = b.title.toLowerCase();

                if (a < b) return -1;//keep a b
                if (a > b) return 1;//switch places b a
                return 0
            })

        }

   return (
       <Modal sx={{zIndex: '200', width: '90vw', margin: '0 auto', padding: 4}}
              open={open}
              onClose={close}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
       >
           <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                   Dodaj nową kategorię
               </Typography>
               <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                   <TextField  id="standard-basic" label="Nazwa kategorii" variant="standard" autoComplete='off' onChange={ e => setNewCategoryName(e.target.value)}/>
               </Typography>

               <ImageListItem key={pickedImage.id} cols={1} sx={{rowHeight: 100 ,rowWidth: 200}}>
                   {pickedImage !== ''?
                   <img
                       src= {pickedImage}
                       srcSet= {pickedImage}
                       alt="zdjecie kategorii"
                       loading="lazy"
                   /> : null}

               </ImageListItem>

               <ImagePickerModal/>
               {errorMessage !== ''? <Alert severity="error">{errorMessage}</Alert>:null}
               <Button onClick={()=> {

                   if(pickedImage !== "" && newCategoryName !== "") {
                       addCategory({
                           "url": pickedImage,
                           "title": newCategoryName,
                           "path": slugify(newCategoryName, "_"),
                           "user": user.uid,
                       });
                       closeModal();

                   } else {
                       setErrorMessage("Nazwa i zdjecie wymagane.")
                   }
               }}>Dodaj kategorię</Button>
           </Box>

       </Modal>

   )
}

export default AddCategoryModal;