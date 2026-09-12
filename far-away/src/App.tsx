import { useState } from 'react'

import {Logo} from './components/Logo';
import {Form} from './components/Form';
import {List} from './components/List';

import './App.css'
import './index.css'

function App() {
 return (
  <div className="app">
    <Logo />
    <Form />
    <List />
  </div>
  )
    
}

export default App
