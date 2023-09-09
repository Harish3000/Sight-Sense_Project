import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' : 
            return { user: action.payload }
        case 'LOGOUT' : 
            return { user: null }
        case 'UPDATE_USER':
            return { user: action.payload };
        default : 
            return state
    }
};

export const AuthContextProvide = ({children}) => {
const [state, dispatch] = useReducer(AuthReducer, {
    users : null
})

//Set the Initial Auth Status 
useEffect (() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        dispatch({ type: 'LOGIN' , payload: user })
    }
}, [])

// Function to update user data
const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
};

console.log("AuthContext state : ",state) //keep track of login and logout in the console

return (
    <AuthContext.Provider value={{...state, dispatch, updateUser}}>
        { children }
    </AuthContext.Provider>
)
}