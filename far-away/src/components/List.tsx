import {ListItem} from './ListItems';
// import type {ComponentProps} from 'react';
import type {Items} from '../types'



export function List({items = [], onRemoveItem, onTogglePacked}: {items?: Items[]; onRemoveItem: (id: number) => void; onTogglePacked: (id: number) => void}) {
    
    const sortedItems = [...items].sort((a, b) => a.item.localeCompare(b.item));
    
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <ListItem key={item.id} item={item} onRemoveItem={onRemoveItem} onTogglePacked={onTogglePacked} />
                ))}
            </ul>
            <div className="actions">
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