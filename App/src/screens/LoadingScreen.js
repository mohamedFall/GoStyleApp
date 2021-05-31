import React, { useEffect, useContext }from 'react'

import styled from 'styled-components/native'
import Text from '../components/Text'

import { theme } from '../core/theme'

import { UserContext } from '../context/UserContext'
import { MainContext } from '../context/MainContext'

export default LoadingScreen = () => {
    const [_, setUser] = useContext(UserContext)
    const main = useContext(MainContext)

    useEffect(() => {
        setTimeout(async () => {
            const user = await main.getCurrentUser()

            if(user) {
                const userInfo = await main.getUserInfo(user.uid)
                const myItems = await main.getMyItems(user.uid)
                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: userInfo.id,
                    username: userInfo.username,
                    firstName: userInfo.prenom,
                    lastName: userInfo.nom,
                    myItems: myItems 
                })
            } else {
                setUser((state) => ({ ...state, isLoggedIn: false}))
            }
        }, 500)
    }, [])

    return (
        <Container>
            <Text title heavy center color="#fff"><Text medium heavy center color="#fff">Go</Text>Style</Text>
            <Loading />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.primary};
`

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: "#ffffff",
    size: "large"
}))`
    position: absolute;
    bottom: 20px;
`