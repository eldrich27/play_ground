import {ListItem} from './ListItems';
// import type {ComponentProps} from 'react';
import type {Items} from '../types'



export function List({items = [], onRemoveItem, onTogglePacked}: {items?: Items[]; onRemoveItem: (id: number) => void; onTogglePacked: (id: number) => void}) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <ListItem key={item.id} item={item} onRemoveItem={onRemoveItem} onTogglePacked={onTogglePacked} />
                ))}
            </ul>
        </div>
    )
}