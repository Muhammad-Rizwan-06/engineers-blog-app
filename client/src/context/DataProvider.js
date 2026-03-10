import { createContext, useState, useEffect } from "react";


export const DataContext = createContext(null);

// Initialize state from sessionStorage
const initializeAuthState = () => {
    const token = sessionStorage.getItem('accessToken');
    const storedAccount = sessionStorage.getItem('account');
    
    if (token && storedAccount) {
        try {
            return {
                account: JSON.parse(storedAccount),
                isAuthenticated: true
            };
        } catch (error) {
            console.error('Error parsing stored account data:', error);
            sessionStorage.removeItem('account');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
        }
    }
    
    return {
        account: { name: '', username: '' },
        isAuthenticated: false
    };
};

const DataProvider = ({ children }) => {
    const initialState = initializeAuthState();
    const [ account, setAccount ] = useState(initialState.account);
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
        
    return (
        <DataContext.Provider value={{ 
            account, 
            setAccount,
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;