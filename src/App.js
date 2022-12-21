import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';


export const theme = createTheme({
  palette: {
    mode: "dark",
    
  }
})
function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       
       
          <Header/>
      
      <Routes>
          <Route path="/" element={<HomePage />} exact />
          
        <Route path="/coins/:id" element={<CoinPage/>} exact/>

        
      </Routes>
    
   
      </ThemeProvider>
      
    </BrowserRouter>
  
  );
}

export default App;
