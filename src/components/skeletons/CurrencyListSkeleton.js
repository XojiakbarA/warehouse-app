import {Skeleton, ListItem, ListItemText, Typography} from "@mui/material";

const CurrencyListSkeleton = () => {

    const arr = [1, 2, 3]

    return (
        arr.map(n => (
            <ListItem key={n}>
                <ListItemText
                    primary={<Typography variant={"h6"}><Skeleton width={"20%"}/></Typography>}
                    secondary={<Skeleton width={"30%"}/>}
                />
            </ListItem>
        ))
    )
}

export default CurrencyListSkeleton