import React, { createContext, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

export const myContext = createContext({});

const Context = (props: any) => {

    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:4000/getuser", {withCredentials: true}).then((res: AxiosResponse) => {
            if (res.data){
                console.log(res.data);
                setUserObject(res.data);
            }
        })
    }, []);

    return (
        <myContext.Provider value={userObject}>
            {props.children}
        </myContext.Provider>
    )
}

export default Context
