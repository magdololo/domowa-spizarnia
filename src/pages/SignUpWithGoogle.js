import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import useStore from "../store/useStore";
const SignUpWithGoogle = () => {
        const handleChange = ()=>{
            console.log("checkbox");
        }
        const signUpWithGoogle = useStore(state=>state.signWithGoogle);
    return(
        <>
            <CssBaseline />
            <Box>
                <Box sx={{ width:'100vw', height: '40vh' }}>
                    <img src= "/images/domowa_spizarnia.jpg" style={{width: "100%", height: "100%", objectFit: 'contain'}} alt="zdjęcie spiżarni"/>
                </Box>
                <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", marginTop: "2em", color: "gray"}}>
                    <Typography variant="button" display="block" gutterBottom>
                        Nie masz jeszcze konta. Zaznacz wymagane zgody i zarejestruj się.
                    </Typography>
                </div>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'.5em auto'}}>
                    <Box style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", margin: '0 auto'}}>
                        <FormControlLabel control={<Checkbox/>} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} label="Akceptuję regulamin serwisu." />
                    </Box>
                </Box>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'30px auto', justifyContent: "center"}}>
                    <Button variant="outlined" style={{ marginTop: 10 }} onClick={signUpWithGoogle}>
                        <span>Zarejestruj się</span>
                    </Button>
                </Box>
                {/*<Divider sx={{margin: '0 15vw', color: 'gray'}}>lub</Divider>*/}
                {/*<Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'30px auto', justifyContent: "center"}}>*/}
                {/*    <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center",  width: '25ch'}}>*/}
                {/*        /!*<FacebookLoginButton style={{ marginTop: 2}} onClick={() => alert("Hello")}>*!/*/}
                {/*        /!*    <span>Zarejestruj się przez FB</span>*!/*/}
                {/*        /!*</FacebookLoginButton>*!/*/}
                {/*        <GoogleLoginButton style={{ marginTop: 10 }} onClick={() => alert("Hello")}>*/}
                {/*            <span>Zarejestruj się przez Google</span>*/}
                {/*        </GoogleLoginButton>*/}
                {/*    </div>*/}
                {/*</Box>*/}

            </Box>
        </>
    )

};

export default SignUpWithGoogle;