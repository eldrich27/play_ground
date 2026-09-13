import type {Items} from '../types';

export function Stats({items}: {items: Items[]}) {
    if (!items || items.length === 0) {
        return (
            <footer className="stats">
                <em>Gowing Somewhre 🛫! Start by adding some items to your list.</em>
            </footer>
        )
    }
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentagePacked = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

    return(
        <footer className="stats">
            <em>{packedItems === totalItems ? 'All items packed! 🎉' : `You have ${totalItems} items on your shopping list, and ${packedItems} are packed (${Math.round(percentagePacked)}%)`}</em>
        </footer>
    )
}