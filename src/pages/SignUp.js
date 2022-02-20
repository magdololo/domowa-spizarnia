import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormSignUp from "../components/FormSignUp";
import {Link} from "react-router-dom";



const SignUp = () => {

    return(
        <>
            <CssBaseline />
            <Box>
                <Box sx={{ width:'100vw', height: '40vh' }}>
                    <img src= "/images/domowa_spizarnia.jpg" style={{width: "100%", height: "100%", objectFit: 'contain'}} alt="zdjęcie spiżarni"/>
                </Box>
                <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", marginTop: "2em", color: "gray"}}>
                    <Typography variant="button" display="block" gutterBottom>
                       Załóż konto
                    </Typography>
                </div>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'.5em auto'}}>
                    <Box style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", margin: '0 auto'}}>
                        <FormSignUp/>
                    </Box>
                </Box>
                <Box style={{
                    display: "flex",
                    flexWrap: 'wrap',
                    margin: '10px auto 30px auto',
                    justifyContent: "center",
                    width: '25ch',
                    marginTop: ".5em"
                }}>
                    <Typography variant="caption" display="block" gutterBottom>
                        Wróć do strony logowania
                        <Link to={'/'} style={{color: "gray", marginTop: 4, fontSize: "small", marginLeft: "1em"}}>Zaloguj się</Link>
                    </Typography>
                </Box>
            </Box>
       </>
    )

};

export default SignUp;