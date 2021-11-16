import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Button, FormControl, InputLabel, OutlinedInput} from "@mui/material";


const ForgotPassword = () => {
    const [values, setValues] = React.useState({

        email: '',

    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return(
        <>
            <CssBaseline />
            <Box>
                <Box sx={{ width:'100vw', height: '40vh' }}>
                    <img src= "/images/domowa_spizarnia.jpg" style={{width: "100%", height: "100%", objectFit: 'contain'}}/>
                </Box>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'.8em auto'}}>
                    <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", marginTop: "2em", color: "gray"}}>
                        <Typography variant="button" display="block" gutterBottom>
                            Odzyskaj konto
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            Wpisz adres e-mail konta do którego chcesz odzyskać dostęp.
                        </Typography>
                    </div>
                </Box>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin: '0 auto'}}>
                    <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center"}}>

                        <FormControl sx={{ m: .5, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                value={values.email}
                                onChange={handleChange('email')}
                                type="text"
                                label="Email"
                            />
                        </FormControl>
                        <Button sx={{ m: 1, width: '14ch' }} variant="contained" onClick={()=>alert("logowanie")}>Dalej</Button>
                    </div>
                </Box>
            </Box>
        </>
    )

 };

export default ForgotPassword;