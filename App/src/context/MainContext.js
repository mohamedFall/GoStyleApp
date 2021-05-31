import React, { useState, createContext } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

const MainContext = createContext()

const currentUser = {
    uid: null
}

const Db = {
    getCurrentUser: async () => {
        try {
            return await (AsyncStorage.getItem('@currentUser')).then((value) => {
                const currentUser = JSON.parse(value)
                console.log(currentUser.id)
                return currentUser
            })
        } catch (error) {
            console.log("Error @getCurrentUser ", error)
        }
    },

    setCurrentUser: (user) => {
        try {
            AsyncStorage.setItem('@currentUser', JSON.stringify(user))
        } catch (error) {
            console.log("Error @setCurrentUser ", error)
        }
    },

    createUser: async (user) => {
        var formData = new FormData();
            formData.append('type', 'signup');
            formData.append('subscription_first_name', user.firstName);
            formData.append('subscription_last_name', user.lastName);
            formData.append('subscription_email', user.email);
            formData.append('subscription_password', user.password);
            return fetch('https://momo777.mycollege-space.com/projet_dev/GoStyle/Api/Signup.php',
                {
                    method: 'POST',
                    headers:
                        {
                            'Content-Type': 'multipart/form-data',
                        },
                    body: formData
                }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                return responseJsonFromServer
            }).catch((error) => {
                console.log("Error @fetchCreateUser ", error)
            });
    },

    getUserInfo: async (uid) => {
        try {
            let response = await fetch('https://momo777.mycollege-space.com/projet_dev/GoStyle/Api/User.php?id='+ uid);
            let json = await response.json();
            return json;
        } catch (error) {
            console.log("Error @getUserInfo ", error)
        }
    },

    logIn: async (username, password) => {
        try {
            return fetch('https://momo777.mycollege-space.com/projet_dev/GoStyle/Api/Login.php',
                {
                    method: 'POST',
                    headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                return responseJsonFromServer
            }).catch((error) => {
                console.log("Error @fetchLogIn ", error)
            });
        } catch (error) {
            console.log("Error @logIn ", error)
        }
    },

    logOut: async () => {
        try {
            AsyncStorage.setItem('@currentUser', '')

            return true
        } catch (error) {
            console.log("Error @logOut ", error)
        }

        return false
    },

    getMyItems: async (uid) => {
        try {
            let response = await fetch('https://momo777.mycollege-space.com/projet_dev/GoStyle/Api/UserCoupons.php?id=' + uid);
            let json = await response.json();
            return json;
        } catch (error) {
            console.log("Error @getItems ", error)
        }
    },

    getItem: async (itemId) => {
        try {
            let response = await fetch('https://momo777.mycollege-space.com/projet_dev/GoStyle/Api/Coupon.php?id=' + itemId);
            let json = await response.json();
            return json;
        } catch (error) {
            console.log("Error @getItems ", error)
        }
    },

    addItem: async (uid, itemId) => {
        try {
            let response = await fetch('https://momo777.mycollege-space.com/projet_dev/GoStyle/Api/Add.php?idUser=' + uid + '&idCoupon=' + itemId);
            let json = await response.json();
            return json;
        } catch (error) {
            console.log("Error @getItems ", error)
        }
    }
}

const MainProvider = (props) => {
    return <MainContext.Provider value={Db}>{props.children}</MainContext.Provider>
}

export { MainContext, MainProvider }