import React, { useState, useContext } from 'react'
import { View } from 'react-native'

import Button from '../components/Button'

import styled from 'styled-components/native'
import Text from '../components/Text'

import { theme } from '../core/theme'

import { MainContext } from '../context/MainContext'
import { UserContext } from '../context/UserContext'

export default ProfileScreen = () => {
    const [user, setUser] = useContext(UserContext)
    const [isloading, setIsLoading] = useState(true)

    const mainContext = useContext(MainContext)

    const logOut = async () => {
        const loggedOut = await mainContext.logOut()
        console.log(loggedOut)
    
        if(loggedOut) {
            setUser(state => ({
              uid: null,
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              myItems: null,
              isLoggedIn: false,
            }))
        }
    }

    return (
        <Container>
            <Header>
                <Text medium heavy color={theme.colors.primary}>Profile</Text>
            </Header>

            <Main>
                <AvatarContainer>
                    <Avatar source={require('../assets/avatardefault.png')} />
                    <Text large heavy margin="24px 0 0 0">{user.firstName + ' ' + user.lastName}</Text>
                    <Text medium semi>{user.username}</Text>
                </AvatarContainer>
                <ButtonsContainer>
                    <Button
                        mode="outlined"
                        onPress={logOut} >
                        Logout
                    </Button>
                </ButtonsContainer>
            </Main>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
`

const Header = styled.View`
    position: absolute;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 15px;
`

const Main = styled.View`
    flex: 1;
    margin-top: 50px;
`

const AvatarContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const Avatar = styled.Image`
    width: 136;
    height: 136;
    border-radius: 68px;
`

const ButtonsContainer = styled.View`
    justify-content: center;
    align-items: center;
    padding: 10px 30px;
`
