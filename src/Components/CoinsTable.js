import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Container} from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { CoinList } from './config/Api'

import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carousel'



const CoinsTable = () => {

    const navigate = useNavigate();

    const [coins, setCoins] = useState([]);

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')

    const { currency, symbol } = CryptoState();

    const [page, setPage] = useState(1);

    const fetchCoins = async () => {

        setLoading(true);
        const { data } = await axios.get(CoinList(currency))

        // console.log('data', data);
        setCoins(data);

        setLoading(false);
    }

    

    useEffect(() => {
        fetchCoins();
// eslint-disable-next-line
    }, [currency]);


    const handleSearch = () => {
        return coins.filter((coin) => (coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)));
    }
    // console.log('got array ', handleSearch());
    
    return (
        <>
            <Container style={{ textAlign: "center" }}>
                <Typography variant='h4' style={{ margin: 18, fontFamily: "Montserrat" }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search For a Crypto Currrency.." variant='outlined' style={{
                    marginBottom: 20, width: "100%"
                }}
                    onChange={(e) => setSearch(e.target.value)} />

                <TableContainer>
                    {/* /* <LinearProgress /> is basically a meterial ui component which shows the loading */}
                    {
                        loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) : (
                            <Table>
                            <TableHead sx={{ backgroundColor: "gold" }}>
                                <TableRow>
                                    {
                                        ["Coin", "Price", "24h change", "Market Cap"].map((head) =>
                                            
                                        (<TableCell style={{
                                        color: "black",
                                        fontWeight: "700", fontFamily: "Montserrat",
                                    }}
                                        key={head}
                                            align={head ==="Coin" ?"left":"right"}
                                           
                                        >
                                        {head}
                                    </TableCell>))
                                    }
                                </TableRow>

                            </TableHead>

                            <TableBody>
                                {handleSearch().slice((page-1)*10,(page-1)*10+10).map(row => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <TableRow onClick={() => navigate(`/coins/${row.id}`)
                                    } key={row.name}
                                            sx={{"&:hover": {
                                                backgroundColor: 'rgb(19, 17, 17)'
                                            },
                                                backgroundColor: "#16171a",
                                                cursor: "pointer",
                                                fontFamily: "Montserrat",
}}>

                                        <TableCell component='th'
                                            scope='row'
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                        >
                                            <img
                                                src={row?.image}
                                                alt={row.name
                                                }
                                                height="50"
                                                style={{ marginBottom: 10 }} />
                                            <div style={{ display: "flex", flexDirection: "column" }} >
                                                <span style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 22,
                                                }}>
                                                    {row.symbol}

                                                </span>
                                                <span style={{ color: "darkgrey" }}>{row.name}</span>

                                            </div>


                                        </TableCell>

                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                                color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                fontWeight: 500
                                            }}
                                        >

                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%


                                        </TableCell>

                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.market_cap.toString().slice(0, - 6))}M
                                        </TableCell>

                                    </TableRow>)
                                })}
                            </TableBody>


                        </Table>)
                    }
                </TableContainer>
                      
                
                {/* count=(handleSearch()?.length/10) because on each page we have 10 elements and  handleSearch has 100 element so that could be displayed in 10 pages */}

                <Pagination sx={{
                    padding:2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    ".MuiPaginationItem-root":{
                        color:"gold",
                    }
                }} count={(handleSearch()?.length / 10)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                    
                        
                            />
            </Container>
        </>
    )
}

export default CoinsTable
