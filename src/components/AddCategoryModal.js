import {Button, ImageListItem, Modal, TextField, useMediaQuery} from "@mui/material";
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
        width: maxWidth400 ? 340 : 400,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 1200,
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
       <Modal sx={{zIndex: '200'}}
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
                   <TextField id="standard-basic" label="Nazwa kategorii" variant="standard" onChange={ e => setNewCategoryName(e.target.value)} />
               </Typography>

               <ImageListItem key={pickedImage.id} cols={1} sx={{rowHeight: 120, rowWidth: 200}}>
                   {pickedImage !== ''?
                   <img
                       src= {pickedImage}
                       srcSet= {pickedImage}
                       alt="zdjecie kategorii"
                       loading="lazy"
                   /> : null}

               </ImageListItem>
               <ImagePickerModal/>
               <Button onClick={()=> {
                   // String.prototype.capitalize = function() {
                   //     return this.charAt(0).toUpperCase() + this.slice(1);
                   // }
                   addCategory({
                       "url": pickedImage,
                       "title": newCategoryName,
                       "path": slugify(newCategoryName, "_"),
                       "user": user.uid,

                   });
                   close();
                   setPickedImage('');
               }}>Dodaj kategorię</Button>
           </Box>

       </Modal>

   )
}

export default AddCategoryModal;