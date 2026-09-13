

import { useState } from "react"

export function Form() {
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  return (
    <form className="add-form">
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
      <input type="text" placeholder="Item.." />
      <button type="submit">Add</button>
    </form>
  )
}