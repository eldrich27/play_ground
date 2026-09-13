import type {Items} from '../types';

interface ListItemProps {
    item: Items;
    onRemoveItem: (id: number) => void;
}

export function ListItem({item, onRemoveItem}: ListItemProps) {
    return(
        <li>
            <span>{item.quantity}</span> 
            <span> {item.item}</span>
            <button onClick={() => onRemoveItem(item.id)}>❌</button>
        </li>
    )
}