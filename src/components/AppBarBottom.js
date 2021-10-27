import {AppBar, InputBase, useMediaQuery} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddProductModal from "./AddProductModal";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import {alpha} from "@material-ui/core";

const AppBarBottom = () =>{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const minWidth900 = useMediaQuery('(min-width:900px)');

    const StyledFab = styled(Fab)(({ theme }) => ({
        position: 'relative',
        zIndex: 1,
        top: -30,
        left: 0,
        right: -200,
        margin: '0 auto',
        [theme.breakpoints.up('sm')]: {
            right: -300,
            width: '90',
        },
        [theme.breakpoints.up('md')]: {
            right: -500,
            width: '90',
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
            padding: theme.spacing(1, 1, 1, 0),
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
            <AppBar position="fixed" color="transparent"  sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{width: minWidth900 ? '800px' : '90%', margin: '0 auto'}}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Wyszukaj…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <StyledFab color="secondary" aria-label="add">
                        <AddIcon onClick={handleOpen}/>
                        <AddProductModal open={open} close={handleClose}/>
                    </StyledFab>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppBarBottom;