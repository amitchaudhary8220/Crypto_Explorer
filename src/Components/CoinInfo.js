
import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import 'chart.js/auto';

import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2';



import { theme } from '../App';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from './config/Api';
import { chartDays } from './config/Data';
import SelectButton from './SelectButton';


const CoinInfo = ({coin}) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id,days,currency));


    setHistoricalData(data.prices);
  }

  useEffect(() => {
    fetchHistoricalData();
  // eslint-disable-next-line
  }, [currency,days])
  
  // console.log("historical data", historicalData);
  

  return (
    <Container style={{
     
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop:15,
      padding:20,
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
        marginTop: 0,
        padding:10,
      // justifyContent: "center",

        paddingTop: 0,
      },
    }}>
      {/* we are calculating both date and time because when we see the chart for 24 hours it will show the time but when we will see ti for moths or year it'll show the date */}
      {!historicalData?(<CircularProgress sx={{ color: "gold" }} size={250} thickness={1}/>) : (<>
       
        
        <Line data={{
          labels: historicalData.map(coin => {
            let date = new Date(coin[0]);
            let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()}Pm`:`${date.getHours()}:${date.getMinutes()}AM`

            return days === 1 ? time : date.toDateString();
          }),
          datasets: [{
            data: historicalData.map((coin) => coin[1]),
            label: `Price (Past ${days} Days) in ${currency}`,
        borderColor:'#EEBC1D'}
          ]
        }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }} />
        <div style={{
          display: "flex",
          marginTop:10,
          justifyContent: "space-around",
        width:"100%"}}>
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}>
              {day.label}
            </SelectButton>
          ))}
        </div>
        
      </>)
      }
      
    </Container>
  )
}

export default CoinInfo
