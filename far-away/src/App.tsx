import { useState } from 'react'

import {Logo} from './components/Logo';
import {Form} from './components/Form';
import {List} from './components/List';
import {Stats} from './components/Stats';
import type {Items} from './types'

import './App.css'
import './index.css'

function App() {
  const [items, setItems] = useState<Items[]>([])

  // function to add new items to the list
  const addItem = (newItem: Items) => {
    setItems((items) => [...items, newItem])
  }

  // function to remove items from the list
  const removeItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  // function to update the packed status of an item
  const togglePacked = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
  <div className="app">
    <Logo />
    <Form onAddItem={addItem} />
    <List items={items} onRemoveItem={removeItem} onTogglePacked={togglePacked} />
    <Stats items = {items}/>
  </div>
  )
    
}

export default App
