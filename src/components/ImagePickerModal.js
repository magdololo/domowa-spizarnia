import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useStore from "../store/useStore";
import * as PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 130,
    width: "50%",
    [theme.breakpoints.down('sm')]: {
        width: '50% !important', // Overrides inline-style
        height: 130,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.10,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '2px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 2,
    right: 2,
    top: 2,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});


const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 2,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create('opacity'),
}));


ImageButton.propTypes = {
    style: PropTypes.shape({width: PropTypes.any}),
    focusRipple: PropTypes.bool,
    children: PropTypes.node
};

function ImagePickerModal() {
    const imagesList = useStore(state => state.images);
    const  setPickedImage = useStore(state=>state.setPickedImage);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Wybierz zdjęcie</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h4 id="child-modal-title">Kliknij wybrane</h4>

                    {imagesList.map((image) => (
                        <ImageButton
                            focusRipple
                            key={image.id}
                            style={{
                                width: image.width,
                            }}
                            onClick={()=> {
                                handleClose();
                                setPickedImage(image.url);
                            }}

                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                        </ImageButton>
                    ))}

                    <Button onClick={handleClose}>Zamknij</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
export default ImagePickerModal;