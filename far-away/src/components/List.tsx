import {ListItem} from './ListItems';
import type {ComponentProps} from 'react';

type ListProps = ComponentProps<typeof ListItem>;

export function List({items = []}: {items?: ListProps['item'][]}) {
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