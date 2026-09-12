import {ListItem} from './ListItems';
import type {ComponentProps} from 'react';

type ListItemProps = ComponentProps<typeof ListItem>;

export function List({items = []}: {items?: ListItemProps['item'][]}) {
    return (
        <div className="list">
            <ul>
                {items.map((item, index) => (
                    <ListItem key={index} number={index + 1} item={item} />
                ))}
            </ul>
        </div>
    )
}