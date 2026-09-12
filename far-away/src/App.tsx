import { useState } from 'react'

import {Logo} from './components/Logo';
import {Form} from './components/Form';
import {List} from './components/List';
import {Stats} from './components/Stats';

import './App.css'
import './index.css'

function App() {
 return (
  <div className="app">
    <Logo />
    <Form />
    <List />
    <Stats />
  </div>
  )
    
}

export default App
