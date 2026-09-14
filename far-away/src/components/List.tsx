import {useState} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {ListItem} from './ListItems';
// import type {ComponentProps} from 'react';
import type {Items} from '../types'



export function List({items = [], onRemoveItem, onTogglePacked, setItems}: 
    {
        items?: Items[]; 
        onRemoveItem: (id: number) => void; 
        onTogglePacked: (id: number) => void; 
        setItems: Dispatch<SetStateAction<Items[]>>
    }) {
    
    // use state to manage the sorting and filtering options
    const [sortOption, setSortOption] = useState('input');
    const [filterOption, setFilterOption] = useState('all');

    
    // Sort the items based on the selected sort option
    let sortedItems: Items[] = items;

    if (sortOption === 'input') {
        sortedItems;

    } else if (sortOption === 'Item') {
        // sort by item name
        sortedItems = [...items].sort((a, b) => a.item.localeCompare(b.item));
    } else if (sortOption === 'packed') {
        // sort by packed status
        sortedItems = [...items].sort((a, b) => Number(!a.packed) - Number(!b.packed));
    }

    // Filter Items based on packed and unpacked status
    if (filterOption === 'all'){
        sortOption
    } else if (filterOption === 'packed'){
        sortedItems = [...items].filter(a => a.packed)
    } else if (filterOption === 'unpacked'){
        sortedItems = [...items].filter(a => !a.packed)
    }

    // function to clear the list
    function handleClear() {
        const confirm = window.confirm("Are you sure you want to clear everything?")
        // items.forEach((item) => onRemoveItem(item.id));
        confirm && setItems([])
    }
   
    
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <ListItem key={item.id} item={item} onRemoveItem={onRemoveItem} onTogglePacked={onTogglePacked} />
                ))}
            </ul>
            <div className="actions">
                <div className="action-group">
                    <label htmlFor='sort'>Sort:</label>
                    <div className="select-wrapper">
                        <span className="select-icon" aria-hidden="true">⇅</span>
                        <select id='sort' className="select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="input">Input Order</option>
                            <option value="Item">Item Name</option>
                            <option value="packed">Packed Status</option>
                        </select>
                    </div>
                </div>
                <div className="action-group">
                    <label htmlFor="filter">Filter:</label>
                    <div className="select-wrapper">
                        <span className="select-icon" aria-hidden="true">⏷</span>
                        <select id='filter' className="select" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                            <option value="all">All</option>
                            <option value="packed">Packed</option>
                            <option value="unpacked">Unpacked</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>
    )
}