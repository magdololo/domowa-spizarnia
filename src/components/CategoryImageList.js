import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {Button, capitalize, ImageList, ImageListItem, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import ImagePickerModal from "./ImagePickerModal";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import useStore from "../store/useStore";
import {useState} from "react";
import slugify from "slugify";
import {Link} from "react-router-dom";


// const ImageButton = styled(ButtonBase)(({ theme }) => ({
//         position: 'relative',
//         width: "100%",
//     [theme.breakpoints.down('sm')]: {
//         width: '100% !important', // Overrides inline-style
//         height: 150,
//     },
//
//     '&:hover, &.Mui-focusVisible': {
//         zIndex: 1,
//         '& .MuiImageBackdrop-root': {
//             opacity: 0.15,
//         },
//         '& .MuiImageMarked-root': {
//             opacity: 0,
//         },
//         '& .MuiTypography-root': {
//             border: '2px solid currentColor',
//         },
//     },
// }));
//
// const ImageSrc = styled('span')({
//     position: 'absolute',
//     left: 2,
//     right: 2,
//     top: 2,
//     bottom: 0,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center 40%',
// });

// const Image = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.common.white,
// }));
//
// const ImageBackdrop = styled('span')(({ theme }) => ({
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 2,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.6,
//     transition: theme.transitions.create('opacity'),
// }));
//
// const ImageMarked = styled('span')(({ theme }) => ({
//     height: 2,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: 'absolute',
//     bottom: -2,
//     left: 'calc(50% - 9px)',
//     transition: theme.transitions.create('opacity'),
// }));


   const CategoryImageList =()=>{

    const [newCategoryName,setNewCategoryName] = useState('');
    const categoryList = useStore(state => state.categories);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const pickedImage = useStore(state=>state.pickedImage);
    const addCategory = useStore(state => state.addCategory);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 1200,
    }

       const ImageList = styled('ul')(({ theme }) => ({
           padding: theme.spacing(1),
           [theme.breakpoints.down('sm')]: {
               grid: "repeat(2, 1fr)"
           },
           [theme.breakpoints.up('md')]: {
               grid: "repeat(3, 1fr)"
           },
           [theme.breakpoints.up('lg')]: {
               grid: "repeat(4, 1fr)"
           },
       }));




           return (


                   <ImageList>
                       {categoryList.map((item) => (
                           <ImageListItem key={item.id} component={Link} to={"/" + item.path}>

                               <img
                                   src={item.url}
                                   srcSet={item.url}
                                   alt={item.title}
                                   loading="lazy"
                               />
                           </ImageListItem>
                       ))}
                   </ImageList>





               // <ImageList cols={3}>
               //  {categoryList.map((image) => (
               //      <ImageListItem key={image.url}>
               //      <ImageButton
               //          focusRipple
               //          key={image.title}
               //          component={Link}
               //          to={"/"+image.path}
               //      >
               //          <ImageSrc style={{backgroundImage: `url(${image.url})`}}/>
               //          <Image>
               //              <Typography
               //                  component="span"
               //
               //                  color="inherit"
               //                  sx={{
               //
               //                      letterSpacing: '0.019em',
               //                      fontSize: '1rem',
               //                      textAlign: 'center',
               //                      position: 'absolute',
               //                      bottom: 0,
               //                      right: 0,
               //                      left: 0,
               //                      pt: 2,
               //                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
               //                      backgroundColor: 'rgba(0, 0, 0, 0.53)',
               //                      textTransform: "capitalize",
               //                  } }>
               //                  {image.title}
               //                  {/*<ImageMarked className="MuiImageMarked-root" />*/}
               //              </Typography>
               //
               //          </Image>
               //      </ImageButton>
               //      </ImageListItem>
               //  ))}
               //
               //  <ImageButton sx={{backgroundColor: 'lightgray', display: 'inline-flex'}}>
               //      <Fab sx={{border: '0'}} size="medium" color="secondary" aria-label="add">
               //          <AddIcon onClick={handleOpen}/>
               //          <Modal sx={{zIndex: '1200'}}
               //                 open={open}
               //                 onClose={handleClose}
               //                 aria-labelledby="modal-modal-title"
               //                 aria-describedby="modal-modal-description"
               //          >
               //              <Box sx={style}>
               //                  <Typography id="modal-modal-title" variant="h6" component="h2">
               //                      Dodaj nową kategorię
               //                  </Typography>
               //                  <Typography id="modal-modal-description" sx={{mt: 2}}>
               //                      <TextField id="standard-basic" label="Nazwa kategorii" variant="standard" onChange={ e => setNewCategoryName(e.target.value)} />
               //                  </Typography>
               //                  <ImageListItem key={pickedImage.id} cols={1} rowHeight={120} rowWidth={200}>
               //                      {pickedImage ?
               //                          <img
               //                              src= {pickedImage}
               //                              srcSet= {pickedImage.url}
               //                              loading="lazy"
               //                          /> :
               //                         null
               //                      }
               //
               //                  </ImageListItem>
               //
               //              <ImagePickerModal/>
               //                  <Button onClick={()=> {
               //
               //                      addCategory({
               //                          "url": pickedImage,
               //                          "title": newCategoryName,
               //                          //"width": "33,3%",
               //                          "path": slugify(newCategoryName, "_"),
               //                      });
               //
               //                      handleClose();
               //
               //                  }}>Dodaj kategorię</Button>
               //              </Box>
               //
               //          </Modal>
               //
               //      </Fab>
               //  </ImageButton>
               //
               // </ImageList>

           );
}
export default CategoryImageList;