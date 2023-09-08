import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' : 
            return { user: action.payload }
        case 'LOGOUT' : 
            return { user: null }
        default : 
            return state
    }
};

export const AuthContextProvide = ({children}) => {
const [state, dispatch] = useReducer(AuthReducer, {
    users : null
})

console.log("AuthContext state : ",state) //keep track of login and logout in the console

return (
    <AuthContext.Provider value={{...state, dispatch}}>
        { children }
    </AuthContext.Provider>
)
}