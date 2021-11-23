import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Button} from "@mui/material";
import {makeStyles} from '@material-ui/core';
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),

        '& .MuiTextField-root': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '25ch',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    link: {
        cursor: 'pointer',
    },
}));

const ForgotPassword = () => {
    const [values, setValues] = React.useState({

        email: '',

    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const classes = useStyles();
    const {handleSubmit, control, reset} = useForm();

    const onSubmit = data => {
        console.log(data);//zwraca object z wlasciwoscia email
        // sendPassword(email, password);
        // reset({
        //     email: "",
        // });
    };
    return(
        <>
            <CssBaseline />
            <Box>
                <Box sx={{ width:'100vw', height: '40vh' }}>
                    <img src= "/images/domowa_spizarnia.jpg" style={{width: "100%", height: "100%", objectFit: 'contain'}} alt="zdjęcie spiżarni"/>
                </Box>
                <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: "2em", color: "gray"}}>
                    <Box style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", marginTop: "2em", color: "gray"}}>
                        <Typography sx={{width: "80%"}} variant="subtitle1" display="block" gutterBottom>
                            Odzyskaj konto
                        </Typography>
                        <Typography sx={{width: "80%"}} variant="subtitle2" display="block" gutterBottom>
                            Wpisz adres e-mail konta do którego chcesz odzyskać dostęp.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ width:'78%', height: 'auto', display: 'flex', flexWrap: 'wrap', margin: '0 auto'}}>
                    <Box style={{display: "flex",flexWrap: 'wrap', justifyContent: "center", margin: '0 auto'}}>

                        <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        type="email"

                                    />
                                )}
                                rules={{
                                    required: 'Email wymagany',
                                    pattern: {
                                        value:
                                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Nieprawidłowy email',
                                    },
                                }}
                            />
                        <Button type="submit" variant="contained" color="primary">Dalej</Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )

 };

export default ForgotPassword;