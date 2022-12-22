import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div style={{backgroundImage:"url(./banner2.jpg)"}}>
          <Container sx={{
              height: 400,
              display: "flex",
              flexDirection: "column",
              paddingTop: 8,
              justifyContent: "space-around"
          }}>
              
              <div style={{
                  display: "flex",
                  height: "40%",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign:"center"
                  
              }} >
                  <Typography
                      variant='h2'
                      style={{
                          fontWeight: "bold",
                          marginBottom: 15,
                          fontFamily:"Montserrat",
                  }}>
                      Crypto Explorer
                  </Typography>

                  <Typography style={{
                      color: "darkgray",
                      textTransform: "capitalize",
                      fontFamily:"Montserrat",

                  }}>
                      Get all the Info regarding your favorite Crypto currency
                  </Typography>

                  
              </div>

              <Carousel />
              
          </Container>
          
    </div>
  )
}

export default Banner
