
import { useState } from "react"

export function Form() {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState('');

  const updateQuantity = (value: number) => {
    setQuantity(Math.max(1, value))
  }


  function handleInputChange(e) {
    setItem(e.target.value)
  }

  //   handle form submit
  function handleSubmit(e) {
    e.preventDefault()
    console.log(item)
    console.log({item: e.target.item.value, quantity: e.target.quantity.value})
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