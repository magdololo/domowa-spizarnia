import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import CategoryList from "./pages/CategoryList";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import "./App.css";
import useStore from "./store/useStore";


export default function App() {

    const loggedInUser = useStore(state=> state.loggedInUser);


    return (
        <>

            <h2 style={{textAlign: 'center', margin: '15px auto', padding: '0', color: 'rgba(0, 0, 0, 0.6)'}}>Domowa spiżarnia</h2>
            {loggedInUser !== null?
                    <Switch>
                        <Route path="/:categoryName/:productName">
                            <ProductDetail />
                        </Route>
                        <Route path="/forgotPassword">
                            <ForgotPassword/>
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
                <Login />
            }
            {/*    </CSSTransition>*/}
            {/*</TransitionGroup>*/}

        </>
    );
}


