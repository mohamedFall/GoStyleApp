import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import Button from '../components/Button'

import styled from 'styled-components/native'
import Text from '../components/Text'

import { theme } from '../core/theme'

import { MainContext } from '../context/MainContext'
import { UserContext } from '../context/UserContext'

export default ListItemsScreen = ({navigation}) => {
    const [user, setUser] = useContext(UserContext)
    const [isloading, setIsLoading] = useState(true)

    const mainContext = useContext(MainContext)

    const renderMyItems = ({item}) => <ItemComtainer onPress={() => {navigation.navigate('Item', {item: item})}} >
        <Item>
            <Text small heavy>{item.titre}</Text>
            <Text>{item.descpiton}</Text>
        </Item>
    </ItemComtainer>

    return (
        <Container>
            <Header>
                <Text medium heavy color={theme.colors.primary}>My Coupons</Text>
            </Header>

            <Main>
                <ItemsContainer>
                    <Items data={user.myItems} renderItem={renderMyItems} keyExtractor={item => item.id.toString()} />
                </ItemsContainer>
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


const Loading = styled.ActivityIndicator.attrs(props => ({
    color: theme.colors.primary,
    size: "large"
}))``

const Main = styled.View`
    flex: 1;
    margin-top: 50px;
`

const GetMyItems = styled.TouchableHighlight`
    background-color: ${theme.colors.primary};
    width: 70px;
`

const ItemsContainer = styled.View`
    padding: 10px;
`

const Items = styled.FlatList``

const ItemComtainer = styled.TouchableHighlight`
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 6px;
    padding: 10px;
`

const Item = styled.View`
`