import { Route, Switch } from 'react-router-dom';

import CategoriesPage from '../pages/CategoriesPage';
import ProductsInCategoriesPage from '../pages/ProductsInCategoriesPage';
import OnceProductPage from '../pages/OnceProductPage';
 const Page = ()=> {
     return(
         <>
             <Switch>
                 <Route path="/" exact component={CategoriesPage} />
                 <Route path="/products" component={ProductsInCategoriesPage} />
                 <Route path="/product/:id" component={OnceProductPage } />
             </Switch>
         </>
     )
 }
 export default Page;