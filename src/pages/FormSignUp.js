import React, { useRef }  from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm, Controller} from 'react-hook-form';
import { InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

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


const FormSignUp = () => {
    const classes = useStyles();
    const {handleSubmit, control, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");


    const onSubmit = data => {
        console.log(data);//zwraca object z wlasciwoscia email i password
    };
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate id="form" name="form" method="post">
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
                    minLength: {
                        value: 8,
                        message: 'Password musi zawierać conajmniej 8 znaków',
                    },
                    pattern: {
                        value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                        message:
                            'Password musi zawierać conajmniej 1 literę i 1 cyfrę',
                    },
                    validate: {
                        equals: password =>
                            password !== 'password123' || 'Choose a more secure password',
                    },
                }}
            />
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue= ""
                render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        value= {value}
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
                    validate: {
                        equals:  value =>
                            value === password.current || "Password musi być taki sam"
                    },
                }}
            />

            <div>
                <Button type="submit" variant="contained" color="primary">
                    Załóż konto
                </Button>
            </div>
        </form>
    );
};

export default FormSignUp;