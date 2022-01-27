import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import useStore from "../store/useStore";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {Alert} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
const SignUpWithGoogle = () => {
    const [checkboxState, setCheckboxState] =useState(false);
        const handleChange = (event)=>{
            if (event.target.value === 'on'){
                setCheckboxState(true);
            }
        }

        const signUpWithGoogle = useStore(state=>state.signWithGoogle);
        let history = useHistory();
        const [errorMessage,setErrorMessage] = useState('');
        const registerAndLogWithGoogle = async ()=>{
            console.log("button click")
            console.log(checkboxState)
            if(checkboxState === true) {
                console.log(checkboxState)
                let message = await signUpWithGoogle();
                console.log(message);
                if (message !== '') {
                    setErrorMessage(message);
                }
                else {
                    history.push("/");
                }
            } else if(checkboxState===false){
                setErrorMessage("Zaznacz wymagane zgody!")
            }

        }
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
                            <FormControlLabel control={<Checkbox onChange={handleChange} checked={checkboxState} />}  inputProps={{ 'aria-label': 'controlled' }} label="Akceptuję regulamin serwisu." />
                    </Box>
                </Box>
                <Box style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", margin: '0 auto'}}>
                    {errorMessage !== ''? <Alert severity="error">{errorMessage}</Alert>:null}
                </Box>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'30px auto', justifyContent: "center"}}>
                    <Button variant="outlined" style={{ marginTop: 10 }} onClick={registerAndLogWithGoogle}>
                        <span>Zarejestruj się</span>
                    </Button>
                </Box>
            </Box>
        </>
    )

};

export default SignUpWithGoogle;