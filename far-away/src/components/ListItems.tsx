interface ListItemProps {
    number: number;
    item: string;
}

export function ListItem({number, item}: ListItemProps) {
    return(
        <li>
            <span>{number}</span> 
            <span> {item}</span>
        </li>
    )
}