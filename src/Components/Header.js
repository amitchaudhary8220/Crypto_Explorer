import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import  { CryptoState } from '../CryptoContext'


const Header = () => {

    const navigation = useNavigate();


    //using useContext here to import the state here
    const {currency,setCurrency} = CryptoState();


    return (

        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>

                    <Typography
                        sx={{
                            flex: 1,
                            color: "gold",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                      
                        onClick={() =>
                            navigation('/')}
                    variant="h6">
                        Crypto Explorer

                    </Typography>


                    <Select
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                        variant="outlined"
                        value={currency}
                        onChange={(e)=>setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>

                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
