import * as React from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';

import CategoryList from "./pages/CategoryList";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetail from "./pages/ProductDetail";
import {Slide} from "@mui/material";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./App.css";

export default function App() {
    const location = useLocation();

    return (
        <>
            <h2 sx={{justifyContent: 'center',}}>Domowa spiżarnia</h2>
            {/*<TransitionGroup>*/}
            {/*    <CSSTransition*/}
            {/*        key={location.key}*/}
            {/*        classNames="slide"*/}
            {/*        timeout={1000}*/}
            {/*    >*/}
                    <Switch>
                        <Route path="/:categoryName/:productName">

                            <ProductDetail />

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


