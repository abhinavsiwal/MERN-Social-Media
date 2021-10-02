import React,{Fragment} from 'react';
import { Route } from 'react-router';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Route path="/" exact>
      <Landing />
      </Route>
    </Fragment>
  );
}

export default App;
