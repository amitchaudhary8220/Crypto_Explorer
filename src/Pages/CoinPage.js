import { Box, LinearProgress,Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { theme } from '../App';
import { numberWithCommas } from '../Components/Banner/Carousel';
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../Components/config/Api';
import { CryptoState } from '../CryptoContext';


const CoinPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
 // eslint-disable-next-line
  }, [])

  // console.log(coin);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />
  
  return (

  
      <Box sx={{
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          alignItems: "center",
            justifyContent:"center"
          },

        }}>
      
        <Box sx={{
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop:3,
          borderRight: "2px solid grey",
}}>
        
        <img src={coin?.image.large}
          alt={coin?.name}
          height="200"
        style={{marginBottom:10}}/>
     
      <Typography variant="h3" sx={{
            fontWeight: "bold",
            marginBottom:5,
            fontFamily: "Montserrat",
      }} >
        {coin?.name}
        </Typography>

      <Typography variant="h6" sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 5,
            paddingBottom: 5,
            paddingTop: 0,
            textAlign: "justify",
      }} >
        {coin?.description.en.split(".")[0]}
        </Typography>

          <Box sx={{
            alignSelf: "start",
            padding: 5,
            paddingTop: 5,
            width: "100%",
            [theme.breakpoints.down("md")]: {
              display: "flex",
              justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
              alignItems: "start",
            },
}}>
          <span style={{display:"flex"}}>
              <Typography variant='h5' sx={{
                fontWeight: "bold",
                marginBottom: 2,
                fontFamily: "Montserrat",
}}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }} >
              {numberWithCommas(coin?.market_cap_rank)}

            </Typography>
          </span>
          <span style={{display:"flex"}}>
              <Typography variant='h5' sx={{
                fontWeight: "bold",
                marginBottom:2,
                fontFamily: "Montserrat",
}}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }} >
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
              <Typography variant='h5' sx={{
                fontWeight: "bold",
                marginBottom: 2,
                fontFamily: "Montserrat",
}}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }} >
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M
                    
            </Typography>
          </span>
        </Box>
        
 
        
      </Box>
     
    
      <CoinInfo coin={coin}/>
      
      </Box>
  )
}

export default CoinPage
