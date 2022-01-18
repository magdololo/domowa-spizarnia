import {Button, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import ImagePickerModal from "./ImagePickerModal";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";
import * as React from "react";
import slugify from "slugify";




  const EditCategoryModal =()=>{

      const setEditModalOpen = useStore(state=>state.setEditCategoryModalOpen);
      const updateCategory = useStore(state=>state.updateCategory);
      const [newCategoryName,setNewCategoryName] = useState('');
      const pickedImage = useStore(state=>state.pickedImage);//empty string
      const  editModalOpen = useStore(state=>state.editModalOpen);
      const editCategory = useStore(state=>state.editCategory);// undefined
      const [localImage, setLocalImage] = useState('');
      const maxWidth400 = useMediaQuery('(max-width:400px)');
      const handleClose = () => {
          setEditModalOpen(false);
      }
      useEffect(()=>{
          setNewCategoryName(editCategory.title);
      }, [editCategory]);


      useEffect(()=>{
          if (pickedImage === ''){
              setLocalImage(editCategory.url);
          } else {
              setLocalImage(pickedImage);
          }
      }, [pickedImage, editCategory]);


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
      
      
      
      

      return(
        <Modal sx={{zIndex: '200'}}
               open={editModalOpen}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Edytuj kategorię
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2, mb: 3}}>
            <TextField id="standard-basic" label="Nazwa kategorii" variant="standard" value={newCategoryName} onChange={ e => setNewCategoryName(e.target.value)} />
        </Typography>
        <ImageListItem key={editCategory.id} cols={1} rowHeight={120} rowWidth={200}>
            <img
                src= {localImage}
                srcSet= {localImage}
                alt="zdjecie kategorii"
                loading="lazy"
            />
        </ImageListItem>

        <ImagePickerModal/>
        <Button onClick={()=> {
            // eslint-disable-next-line no-extend-native
            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }
            let path= slugify(newCategoryName, "_");
            updateCategory(editCategory.userId, path, localImage, newCategoryName.capitalize(), editCategory.categoryId);
            handleClose();
           }}>Edytuj kategorię</Button>
        </Box>
      </Modal>
      )
  }

  export default EditCategoryModal;
//TODO: sort categories after edit