import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import ola from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"


function ProtectedRoute({children})
{
    const [isAuthorized, setisAuthorized] = useState(null);

    useEffect( () =>
        {
            auth().catch(()=>{setisAuthorized(false)})
        }, []
    );
    // check if the Acces_tocken wasn't expired
    const refreshToken = async () =>
    {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try
        {
            const res = await ola.post("/api/token/refresh/", {
                refresh:refreshToken, 
            });
            if (res.status === 200)
            {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setisAuthorized(true)
            }
            else
                setisAuthorized(false)
        }
        catch (error)
        {
            console.log(error);
            setisAuthorized(false);
        }
    }
    
    const auth = async () =>
    {
       const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token)
        {
            setisAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now)
            await refreshToken();
        else
            setisAuthorized(true);
    }

    if (isAuthorized == null)
    {
        return (<div>Loading...</div>)
    }

    return isAuthorized ? children : <Navigate to ="/login"/>
}

export default ProtectedRoute;