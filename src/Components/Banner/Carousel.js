import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import {TrendingCoins } from '../config/Api';

// it is regex written to provide "," in price 

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency,symbol} = CryptoState();
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    // console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
     // eslint-disable-next-line 
    }, [currency])

    const items = trending.map((coin) => {
        //will return true or false
        let profit = coin?.price_change_percentage_24h >= 0;
        // we have used here link so that every coin can get us join on given path

        return (<Link style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
           
}} to={`/coins/${coin.id}`}>
            <img src={coin?.image}
                alt={coin?.name}
                height="80"
                style={{ marginBottom: 10 }} />
            {/* coin.symbol is different from symbol */}
            <span>{coin?.symbol}
                &nbsp;
                <span style={{color:profit>0?"rgb(14,203,129)":"red",fontWeight:500,}}>
                    {/* if it is profit then we want to add "+" sybol ,if it is loss then -sign will be added bydefault
                     */}
                    {profit && "+"}
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
                </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

          
    </Link>);
    })
    
    
    const responsive={
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }

    };


  return (
      <div style={{
          height: "50%", display: "flex",
          alignItems: "center",
      }}>
          <AliceCarousel mouseTracking
              infinite
              autoPlayInterval={1000}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              autoPlay
              items={items}
     />
    </div>
  )
}

export default Carousel
