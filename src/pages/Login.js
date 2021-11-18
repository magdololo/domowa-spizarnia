import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import Typography from "@mui/material/Typography";
import useStore from "../store/useStore";



const Login = () => {

    const logIn= useStore(state=>state.logIn);

    const [values, setValues] = React.useState({

        password: '',
        email: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { control, handleSubmit,errors: fieldsErrors, reset  } = useForm({
        defaultValues: {
            password: '',
            repeatPassword:'',
            email: '',
            showPassword: false,
        }
    });
    const onSubmit = data => console.log(data);
    const onSubmitLogin = async data => {
        console.log(data);
         await logIn(data.email, data.password);
        // const response = await UserService.signIn(data);
        // const responseData = await response.json();
        // if (response.ok) setTokenAndConfigureProfile(responseData.token);
        // else {
        //     if (responseData.non_field_errors) setGeneralLoginError(responseData.non_field_errors[0]);
        //     reset(
        //         {
        //             email: '',
        //             password: ''
        //         },
        //         {
        //             errors: true,
        //             dirtyFields: true
        //         }
        //     );
        // }
    };

  return (
      <>

              <CssBaseline />
              <Box>
                  <Box sx={{ width:'100vw', height: '40vh' }}>
                      <img src= "/images/domowa_spizarnia.jpg" style={{width: "100%", height: "100%", objectFit: 'contain'}}/>
                  </Box>

                  <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'30px auto'}}>
                    {/*<div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center"}}>*/}
                        <form onSubmit={handleSubmit(onSubmitLogin)} style={{display: "flex",flexWrap: 'wrap', justifyContent: "center"}}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                value={values.email}
                                onChange={handleChange('email')}
                                type="text"
                                label="Email"
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <Link to={'/forgotPassword'} style={{color: "gray", marginTop: 4, fontSize: "small",}}>Nie pamiętasz hasła?</Link>
                        </FormControl>
                        <Button sx={{ m: 1, width: '14ch' }} variant="contained" onClick={()=>alert("logowanie")}>Zaloguj się</Button>

                    </form>
                  {/*</div>*/}
                  </Box>
                  <Divider sx={{margin: '0 15vw', color: 'gray'}}>lub</Divider>
                  <Box sx={{ width:'90vw', height: 'auto', display: 'flex', flexWrap: 'wrap', margin:'30px auto', justifyContent: "center"}}>
                      <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center",  width: '25ch'}}>
                          <FacebookLoginButton style={{ marginTop: 2}} onClick={() => alert("Hello")} />
                          <GoogleLoginButton style={{ marginTop: 10 }} onClick={() => alert("Hello")} />
                      </div>
                      <div style={{display: "flex",flexWrap: 'wrap', justifyContent: "center",  width: '25ch', marginTop: "1em"}}>
                          <Typography variant="caption" display="block" gutterBottom>
                              Nie masz jeszcze konta?
                              <Link to={'/signUp'} style={{color: "gray", marginTop: 4, fontSize: "small",marginLeft: "1em"}}>Zarejestruj się</Link>
                          </Typography>
                      </div>
                  </Box>

              </Box>
          </>

  )
};
 export default Login;