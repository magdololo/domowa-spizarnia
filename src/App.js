import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import CategoryList from "./pages/CategoryList";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import "./App.css";


export default function App() {


    return (
        <>

            <h2 style={{textAlign: 'center', margin: '15px auto', padding: '0', color: 'rgba(0, 0, 0, 0.6)'}}>Domowa spiżarnia</h2>

                    <Switch>
                        <Route path="/:categoryName/:productName">
                            <ProductDetail />
                        </Route>
                        <Route path="/forgotPassword">
                            <Login/>
                        </Route>
                        <Route path="/signUp">
                            <Login/>
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
            {/*    </CSSTransition>*/}
            {/*</TransitionGroup>*/}

        </>
    );
}


