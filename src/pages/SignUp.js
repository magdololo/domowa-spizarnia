import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Divider,} from "@mui/material";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import Typography from "@mui/material/Typography";
import FormSignUp from "./FormSignUp";



const SignUp = () => {
    // const [values, setValues] = React.useState({
    //     showPassword: false,
    // });
    // const { register, handleSubmit , formState} = useForm({mode: "onChange"});
    //
    // const { errors, isSubmitting, dirtyFields,isDirty } = formState;





    // console.log(dirtyFields);
    // console.log(formState);
    // console.log(dirtyFields.repeatPassword ? 'green' : 'blue')

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
                        {/*<form onSubmit={handleSubmit(onSubmit)} noValidate>*/}
                        {/*<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">*/}
                        {/*    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>*/}
                        {/*    <OutlinedInput*/}
                        {/*        name="email"*/}
                        {/*        {...register('email', { required: true, validate: reg })}*/}
                        {/*        id="outlined-adornment-email"*/}
                        {/*        type="email"*/}
                        {/*        label="Email"*/}
                        {/*    />*/}
                        {/*    {errors.email && <p>Please enter number for age.</p>}*/}
                        {/*    {errors.email?.type === 'validate' && <span>Nieprawidłowy adres email.</span>}*/}
                        {/*</FormControl>*/}
                        {/*<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">*/}
                        {/*    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>*/}
                        {/*    <OutlinedInput*/}
                        {/*        id="outlined-adornment-password"*/}
                        {/*        name="password"*/}
                        {/*        {...register('password', { required: true })}*/}
                        {/*        defaultValue=""*/}
                        {/*        type= {values.showPassword ? 'text' : 'password'}*/}
                        {/*        endAdornment={*/}
                        {/*            <InputAdornment position="end">*/}
                        {/*                <IconButton*/}
                        {/*                    aria-label="toggle password visibility"*/}
                        {/*                    onClick={handleClickShowPassword}*/}
                        {/*                    onMouseDown={handleMouseDownPassword}*/}
                        {/*                    edge="end"*/}
                        {/*                >*/}
                        {/*                    {values.showPassword ? <VisibilityOff /> : <Visibility />}*/}
                        {/*                </IconButton>*/}
                        {/*            </InputAdornment>*/}
                        {/*        }*/}
                        {/*        label="Password"*/}
                        {/*    />*/}
                        {/*    {errors.password?.type === 'required' && <span>Field is required</span>}*/}
                        {/*    <br />*/}
                        {/*</FormControl>*/}

                        {/*<FormControl sx={{ m: 1, width: '25ch',}} variant="outlined">*/}
                        {/*    <InputLabel htmlFor="outlined-adornment-repeatPassword"  >Repeat Password</InputLabel>*/}
                        {/*    <OutlinedInput*/}
                        {/*        sx={{color: dirtyFields.repeatPassword ? 'green' : 'blue'}}*/}
                        {/*        id="outlined-adornment-repeatPassword"*/}
                        {/*        name="repeatPassword"*/}
                        {/*        {...register('repeatPassword', { required: true })}*/}
                        {/*        defaultValue=""*/}
                        {/*        type={values.showPassword ? 'text' : 'password'}*/}
                        {/*        endAdornment={*/}
                        {/*            <InputAdornment position="end">*/}
                        {/*                <IconButton*/}
                        {/*                    aria-label="toggle password visibility"*/}
                        {/*                    onClick={handleClickShowPassword}*/}
                        {/*                    onMouseDown={handleMouseDownPassword}*/}
                        {/*                    edge="end"*/}
                        {/*                >*/}
                        {/*                    {values.showPassword ? <VisibilityOff /> : <Visibility />}*/}
                        {/*                </IconButton>*/}
                        {/*            </InputAdornment>*/}
                        {/*        }*/}
                        {/*        label="Repeat Password"*/}
                        {/*    />*/}
                        {/*    /!*{dirtyFields.repeatPassword && <p>Field is dirty.</p>}*!/*/}
                        {/*    {errors.repeatPassword?.type === 'required' && <span>Field is required</span>}*/}
                        {/*</FormControl>*/}
                        {/*<FormControlLabel disableTypography={true} sx={{fontSize: "small", color: "gray", margin: "0 auto"}} control={<Checkbox defaultChecked />} label="Potwierdzam, że zapoznałem się i akceptuję Regulamin oraz Politykę prywatności." />*/}
                        {/*/!*<Button sx={{ m: 1, width: '14ch' }} variant="contained" onClick={()=>alert("logowanie")}>Załóż konto</Button>*!/*/}
                        {/*    <Button sx={{ m: 1, width: '14ch' }} variant="contained" type="submit" disabled={isSubmitting}>*/}
                        {/*        {isSubmitting? 'Submitting...' : 'Submit'}*/}
                        {/*    </Button>*/}
                        {/*    </form>*/}
                    </Box>
                </Box>
                <Divider sx={{margin: '0 15vw', color: 'gray'}}>lub</Divider>
                <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'30px auto', justifyContent: "center"}}>
                    <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center",  width: '25ch'}}>
                        <FacebookLoginButton style={{ marginTop: 2}} onClick={() => alert("Hello")}>
                            <span>Zarejestruj się przez FB</span>
                        </FacebookLoginButton>
                        <GoogleLoginButton style={{ marginTop: 10 }} onClick={() => alert("Hello")}>
                            <span>Zarejestruj się przez Google</span>
                        </GoogleLoginButton>
                    </div>
                </Box>

            </Box>
        </>
    )

};

export default SignUp;