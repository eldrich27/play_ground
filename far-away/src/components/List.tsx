import {useState} from 'react';
import {ListItem} from './ListItems';
// import type {ComponentProps} from 'react';
import type {Items} from '../types'



export function List({items = [], onRemoveItem, onTogglePacked}: {items?: Items[]; onRemoveItem: (id: number) => void; onTogglePacked: (id: number) => void}) {
    
    // use state to manage the sorting and filtering options
    const [sortOption, setSortOption] = useState('input');
    let sortedItems:Items[] = [];

    if (sortOption === 'input') {
        sortedItems = items;

    } else if (sortOption === 'Item') {
        // sort by item name
        sortedItems = [...items].sort((a, b) => a.item.localeCompare(b.item));
    } else if (sortOption === 'packed') {
        // sort by packed status
        sortedItems = [...items].sort((a, b) => Number(!a.packed) - Number(!b.packed));
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
                <select className="select">
                    <option value="all">All</option>
                    <option value="packed">Packed</option>
                    <option value="unpacked">Unpacked</option>
                </select>
            </div>
        </div>
    )
}