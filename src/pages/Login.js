import * as React from 'react';
import {Controller, useForm} from "react-hook-form";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {
    Alert,
    Button,
    Divider,
    IconButton,
    InputAdornment,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useHistory} from "react-router-dom";
import { GoogleLoginButton} from "react-social-login-buttons";
import Typography from "@mui/material/Typography";
import useStore from "../store/useStore";
import {makeStyles} from "@material-ui/core";
import {useState} from "react";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
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

const Login = () => {
    const classes = useStyles();
    const logIn = useStore(state => state.logIn);
    const logWithGoogle = useStore(state=>state.logWithGoogle);
    const [values, setValues] = React.useState({
        password: '',
        email: '',
        showPassword: false,
    });
    const [errorMessage,setErrorMessage] = useState('');
    let history = useHistory();
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const {handleSubmit,control, reset} = useForm({
        defaultValues: {
            email: 'gabrielajarzyna@gmail.com',
            password: 'gabi1234',
            // email: '',
            // password: '',
            showPassword: false,
        }
    });

    const onSubmitLogin = async (data, e) => {
        e.preventDefault();
        
        let message = await logIn(data.email, data.password);
        
        if (message !== '') setErrorMessage(message);
        reset({
            email: "",
            password: "",
        });
    };
    const loggingGoogle = async () => {
        let message = await logWithGoogle();
        if (message !== '') {
            history.push("/signUpWithGoogle")
        }

    }
    return (
        <>

        <CssBaseline/>
        <Box >
            <Box sx={{width: '100vw', height: '40vh'}}>
                <img src="/images/domowa_spizarnia.jpg" style={{width: "100%", height: "100%", objectFit: 'contain'}} alt="zdjęcie spiżarni"/>
            </Box>

            <Box sx={{width: '30ch', height: 'auto', display: 'flex', flexWrap: 'wrap', margin: '30px auto'}}>
                <form onSubmit={handleSubmit(onSubmitLogin)} className={classes.root} noValidate>

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
                                // eslint-disable-next-line
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Nieprawidłowy email',
                            },


                        }}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label="Password"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type={values.showPassword? "text":"password"}


                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        )}

                        rules={{
                            required: 'Password wymagany',
                        }}
                    />

                    <Button type="submit" variant="contained" color="primary">Zaloguj się</Button>
                    {errorMessage !== ''? <Alert severity="error">{errorMessage}</Alert>:null}
                </form>
            </Box>
            <Box style={{
                display: "flex",
                flexWrap: 'wrap',
                margin: '20px auto 0 auto',
                justifyContent: "center",
                width: '25ch',
                marginTop: ".7em"
            }}>
                <Typography variant="caption" display="block" gutterBottom>
                    Nie masz jeszcze konta?
                    <Link to={'/signUp'} style={{color: "gray", marginTop: 4, fontSize: "small", marginLeft: "1em"}}>Zarejestruj się</Link>
                </Typography>
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
                    Nie pamiętasz hasła?
                    <Link to={'/forgotPassword'} style={{color: "gray", marginTop: 4, fontSize: "small", marginLeft: "1em"}}>Przypomnij hasło</Link>
                </Typography>
            </Box>
            <Divider sx={{margin: '0 15vw', color: 'gray'}}>lub</Divider>
            <Box sx={{
                width: '30ch',
                height: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                margin: '30px auto',
                justifyContent: "center"
            }}>
                <Box style={{display: "flex", flexWrap: 'wrap', justifyContent: "center", width: '25ch'}}>
                    {/*<FacebookLoginButton style={{marginTop: 2}} onClick={() => alert("Hello")}/>*/}
                    <GoogleLoginButton style={{marginTop: 10}} onClick={loggingGoogle}/>
                </Box>

            </Box>
        </Box>

</>

)
};
export default Login;