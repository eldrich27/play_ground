import {ListItem} from './ListItems';
import type {ComponentProps} from 'react';
import type {Items} from '../types'

type ListProps = ComponentProps<typeof ListItem>;

export function List({items = []}: {items?: Items[]}) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <ListItem key={item.id} number={item.quantity} item={item.item} />
                ))}
            </ul>
        </div>
    )
}