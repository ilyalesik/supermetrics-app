import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginPage} from "./pages/LoginPage";
import {LoginForm} from "./components/LoginForm";

function App() {
  return (
    <LoginPage>
        <LoginForm />
    </LoginPage>
  );
}

export default App;
