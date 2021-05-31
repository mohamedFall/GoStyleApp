import React, { useState, createContext } from 'react'

const UserContext = createContext([{}, () => {}])

const UserProvider = (props) => {
    const [state, setState] = useState({
        uid: null,
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        myItems: null,
        isLoggedIn: null,
    })


    return <UserContext.Provider value={[state, setState]}>{props.children}</UserContext.Provider>
}

export { UserContext, UserProvider }