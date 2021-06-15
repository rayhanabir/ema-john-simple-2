import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';



export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
       <Header></Header>
       <h3>email:{loggedInUser.email}</h3>
      <Router>
        <Switch>
          <Route path='/shop'>
          <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <Route path='/inventory'>
              <Inventory></Inventory>
          </Route>
          <Route path='/logIn'>
             <LogIn/>
          </Route>
          <Route path='/shipment'>
             <Shipment/>
          </Route>
          <Route exact path='/'>
              <Shop></Shop>
          </Route>
          <Route path='/product/:productKey'>
                <ProductDetail></ProductDetail>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    
    </UserContext.Provider>
  );
}

export default App;
