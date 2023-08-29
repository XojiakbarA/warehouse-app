import {Skeleton, ListItem, ListItemText, Typography} from "@mui/material";

const MeasurementListSkeleton = () => {

    const arr = [1, 2, 3]

    return (
        arr.map(n => (
            <ListItem key={n}>
                <ListItemText
                    primary={<Typography variant={"h6"}><Skeleton width={"20%"}/></Typography>}
                />
            </ListItem>
        ))
    )
}

export default MeasurementListSkeleton