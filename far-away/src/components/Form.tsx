
import { useState } from "react"
import type {Items} from '../types'

export function Form({onAddItem}: {onAddItem: (newItem: Items) => void}) {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState('');

  const updateQuantity = (value: number) => {
    setQuantity(Math.max(1, value))
  }


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItem(e.target.value)
  }

  //   handle form submit
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    // return if the form is submited without an item
    if (!item.trim()) return

    // Create an array of items with the quantity and item name
    const newItems: Items = { item, quantity, packed: false, id: Date.now() };
    // console.log(newItems)
    onAddItem(newItems)

    // Reset the form
    setItem('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> 
        What do you need😍 for your trip?
      </h3>
      
      <div className="quantity-input">
        <button
          type="button"
          onClick={() => updateQuantity(quantity - 1)}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          id="quantity"
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(event) => updateQuantity(Number(event.target.value))}
          aria-label="Quantity"
        />
        <button
          type="button"
          onClick={() => updateQuantity(quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <input 
        type="text" 
        placeholder="Item.." 
        id="item" 
        value={item}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}