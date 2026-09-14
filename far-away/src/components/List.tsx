import {useState} from 'react';
import {ListItem} from './ListItems';
// import type {ComponentProps} from 'react';
import type {Items} from '../types'



export function List({items = [], onRemoveItem, onTogglePacked}: {items?: Items[]; onRemoveItem: (id: number) => void; onTogglePacked: (id: number) => void}) {
    
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
   
    
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <ListItem key={item.id} item={item} onRemoveItem={onRemoveItem} onTogglePacked={onTogglePacked} />
                ))}
            </ul>
            <div className="actions" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <select className="select">
                    <option value="input">Sort by Input Order</option>
                    <option value="Item">Sort by Item Name</option>
                    <option value="packed">Sort by Packed Status</option>
                </select>
                <select className="select" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                    <option value="all">All</option>
                    <option value="packed">Packed</option>
                    <option value="unpacked">Unpacked</option>
                </select>
                <button>Clear</button>
            </div>
        </div>
    )
}