import {AppBar, InputBase, useMediaQuery} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import AddProductModal from "./AddProductModal";
import * as React from "react";
import { styled, alpha } from '@mui/material/styles';
import Fab from "@mui/material/Fab";
import Button from '@mui/material/Button';
import BottomHamburgerMenu from "./BottomHamburgerMenu";
const AppBarBottom = ({isAddProductFromListCategory}) =>{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)')



    const Button = styled(Fab)(({ theme }) => ({
        position: 'relative',
        zIndex: 1,
        top: -30,
        left: 0,
        right: -200,
        margin: '0 auto',
        lineHeight: '1.15',
        [theme.breakpoints.up('sm')]: {
            right: -300,
            width: '90',
            lineHeight: '1.25',
        },
        [theme.breakpoints.up('md')]: {
            right: -500,
            width: '90',
            lineHeight: '1.75',
        },

    }));
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '66%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '90',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '50%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(0, 1, 1, 6),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));




    return(
        <>
            <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 , backgroundColor: 'white'}}>
                <Toolbar sx={{width: minWidth900 ? '800px' : '90%', margin: '0 auto', color: 'gray'}}>
                    <BottomHamburgerMenu/>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Wyszukaj produkt"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button color="secondary" aria-label="add" variant="extended" onClick={handleOpen} sx={{fontSize: "0.8rem", textTransform: 'none'}}>Add Product</Button>

                        <AddProductModal open={open}  close={handleClose}  isAddProductFromListCategory={isAddProductFromListCategory}/>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppBarBottom;