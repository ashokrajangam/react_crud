import React from 'react';
import Signup from './COMPONENTS/signup/Signup';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
  );
}

export default App;
