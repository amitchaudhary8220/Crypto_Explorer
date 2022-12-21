import React, { createContext, useContext, useEffect, useState } from 'react'

//creating the context
const Crypto = createContext();

//taking here children as props so that all  child component can come inside it
const CryptoContext = ({ children }) => {
    

    //making state which we want to pass in every component 
    const [currency, setCurrency] = useState("INR");
    //ctrl+alt+4 for rupee
    const [symbol, setSymbol] = useState("₹")

    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
        // eslint-disable-next-line 
    }, [currency])
    
    return (
      
        //passing all the states using value to make them available in all the components
        
      <Crypto.Provider value={{currency,symbol,setCurrency}}>
          {children}
        </Crypto.Provider>
        
  )
}

export default CryptoContext

//using context with the help of useContext ,it is same as importing useContext in desired component and then passing createdcontext in the useContext

export const CryptoState = () => {
   return  useContext(Crypto);
}
