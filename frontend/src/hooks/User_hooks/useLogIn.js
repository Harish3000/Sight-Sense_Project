import { useState } from "react";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import { useContext } from "react";

export const useLogIn = () => {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext);

    const login = async (
        email,
        password,) => {
        setIsLoading(true);
        setErr(null); //must to have

        const response = await fetch('http://localhost:4000/api/users/login', {
            method : 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email,
                password,})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setErr(json.error)
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json)) //save the both email and the token

            //update auth context
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false);
        }
    }

    return { login, isLoading, err };
}