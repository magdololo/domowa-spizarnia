import * as React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import CategoryList from "./pages/CategoryList";
import CategoryDetail from "./pages/CategoryDetail";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import "./App.css";
import useStore from "./store/useStore";
import SearchResults from "./pages/SearchResults";
import SignUpWithGoogle from "./pages/SignUpWithGoogle";
import { getAuth, onAuthStateChanged } from "firebase/auth";




export default function App() {

    const loggedInUser = useStore(state=> state.loggedInUser);
    const setLogInUser = useStore(state=>state.setLogInUser)
    let history = useHistory();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLogInUser(user);
        } else {
            history.push("./")
            //setLogInUser(null)
        }
    });

    return (
        <>

            <h2 style={{textAlign: 'center', margin: '15px auto', padding: '0', color: 'rgba(0, 0, 0, 0.6)'}}>Domowa spiżarnia</h2>
            {loggedInUser !== null?
                    <Switch>
                        <Route path='/search'>
                            <SearchResults/>
                        </Route>
                        <Route path="/products">
                            <ProductsList />
                        </Route>
                        <Route path="/:categoryName/:productName">
                            <ProductDetail />
                        </Route>
                        <Route path="/forgotPassword">
                            <ForgotPassword/>
                        </Route>
                        <Route path="/signUpWithGoogle">
                            <SignUpWithGoogle/>
                        </Route>
                        <Route path="/signUp">
                            <SignUp/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/:categoryName">
                            <CategoryDetail />
                        </Route>

                        <Route path="/">
                            <CategoryList />
                        </Route>
                    </Switch>
            :
                <Switch>
                    <Route path="/forgotPassword">
                        <ForgotPassword/>
                    </Route>
                    <Route path="/signUpWithGoogle">
                        <SignUpWithGoogle/>
                    </Route>
                    <Route path="/signUp">
                        <SignUp/>
                    </Route>
                    <Route path="/" >
                        <Login />
                    </Route>
                </Switch>

            }
            {/*    </CSSTransition>*/}
            {/*</TransitionGroup>*/}

        </>
    );
}


