import type {Items} from '../types';

interface ListItemProps {
    item: Items;
    onRemoveItem: (id: number) => void;
    onTogglePacked: (id: number) => void;
}

export function ListItem({item, onRemoveItem, onTogglePacked}: ListItemProps) {
    return(
        <li >
            <input type="checkbox" checked={item.packed} onChange={() => onTogglePacked(item.id)} />
            <div className={item.packed ? 'done' : ''}>
                <span>{item.quantity}</span> 
                <span > {item.item}</span>
            </div>
            <button onClick={() => onRemoveItem(item.id)}>❌</button>
        </li>
    )
}