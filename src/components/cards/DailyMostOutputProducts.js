import Typography from "@mui/material/Typography";
import {
    CircularProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {fetchDailyMostOutputProducts} from "../../api";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";
import MainAlert from "../alerts/MainAlert";
import { useMessage } from "../../hooks/useMessage";

const DailyMostOutputProducts = () => {

    const [collapse, setCollapse] = useState(false)

    const { message, onError, clearMessage } = useMessage()
    const [loading, setLoading] = useState(false)

    const [products, setProducts] = useState([])

    const getDailyMostOutputProducts = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await fetchDailyMostOutputProducts()
            setProducts(data.data)
        } catch (e) {
            onError(e)
        }
        setLoading(false)
    }, [onError])

    useEffect(() => {
        getDailyMostOutputProducts()
    }, [getDailyMostOutputProducts])

    return (
        <Stack spacing={2}>
            <Typography variant={"h5"} color={"primary"} marginTop>Daily Most Output Products</Typography>
            <MainAlert
                message={message}
                onClose={clearMessage}
            />
            {
                loading
                ?
                <CircularProgress/>
                :
                    <Stack>
                    <Collapse in={collapse} collapsedSize={450}>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Sum</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        !products.length
                                        ?
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                    No data
                                                </TableCell>
                                                <TableCell align="right">No data</TableCell>
                                        </TableRow>
                                        :
                                        products.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.sum}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Collapse>
                        <Box alignSelf={"center"}>
                        <IconButton onClick={ () => setCollapse(i => !i)}>
                            { collapse ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                        </IconButton>
                        </Box>
                    </Stack>
            }
        </Stack>
    )
}

export default DailyMostOutputProducts