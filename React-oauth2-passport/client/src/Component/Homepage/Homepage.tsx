import React, { useContext } from 'react'
import { myContext } from './../../Context';
import { IUser } from '../../types/maintypes';

export const Homepage = () => {
    const context = useContext(myContext) as IUser;
    return (
        <div>
        {
            context ? 
            (
                <h1>Welcome back! {context.username}</h1>
                )
                :
                (
                    <h1>Welcome to my Website!</h1>
                )
        }
        </div>
    )
}
