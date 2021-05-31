import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import Button from '../components/Button'

import Toast from 'react-native-toast-message'
import styled from 'styled-components/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../components/Text'

import { theme } from '../core/theme'

import { MainContext } from '../context/MainContext'
import { UserContext } from '../context/UserContext'

export default ItemScannedScreen = ({navigation, route}) => {
    const [user, setUser] = useContext(UserContext)
    const [isloading, setIsLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const {item} = route.params

    const mainContext = useContext(MainContext)

    const checkItemAlreadyExists = (itemId) => {
        const exists = false
        user.myItems.map(item => {
            if(item.id == itemId) {
                exists = true
            }
        })
        if(exists) {
            return exists
        }
    }

    const addItem = async (item) => {
        try {
            setIsAdding(true)
            let exists = false
            user.myItems.map(_item => {
                if(item.id == _item.id) {
                    exists = true
                }
            })
            if(exists == false) {
                const myItems = user.myItems
                await user.myItems.push({id: item.id, code: item.code, titre: item.titre, descpiton: item.descpiton, date_fin: item.date_fin, limitations: item.limitations})
                const addedItem = await mainContext.addItem(user.uid, item.id)
                if(addedItem.status == true){
                    navigation.navigate('Items')
                    setIsAdding(false)
                } else {
                    Toast.show({
                        type: 'info',
                        position: 'bottom',
                        text1: 'Oups !',
                        text2: "Une erreur de connection s'est produite !"
                    });
                    setIsAdding(false)
                }
            } else {
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'Oups !',
                    text2: "Vous possédez déjà ce coupon !"
                });
                setIsAdding(false)
            }
        } catch (error) {
            console.log("Error @AddingItem ", error)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Oups !',
                text2: "Une erreur s'est produite !"
            });
            setIsAdding(false)
        }
    }

    return (
        <Container>
            <Header>
                <Text numberOfLines={1} medium heavy color={theme.colors.primary}>{item.titre}</Text>
            </Header>

            <Main>
                <ItemsContainer>
                    <ItemComtainer onPress={() => {}} >
                        <Item>
                            <CodeCouponContainer>
                                <CodeCoupon>
                                    <Text title heavy>{item.code}</Text>
                                </CodeCoupon>
                            </CodeCouponContainer>
                            <Text large heavy margin="0 0 10px 0">{item.titre}</Text>
                            <Text medium margin="0 0 10px 0">{item.descpiton}</Text>
                            <EndDate>
                                <Icon name="alarm-outline" size={24} color={theme.colors.primary} />
                                <Text> Termine le {moment(item.date_fin).format("MM/DD/YYYY")} </Text>
                            </EndDate>
                            <Limitations>
                                <Icon name="alert-circle-outline" size={24} color={theme.colors.primary} />
                                <Text> Limitations {item.limitations} </Text>
                            </Limitations>
                        </Item>
                    </ItemComtainer>
                    <AddItem onPress={() => addItem(item)}>
                        { isAdding ? (
                            <Loading />
                        ) : (
                            <Text medium heavy color="#fff">Add Item</Text>
                        )}
                    </AddItem>
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
    color: "#fff",
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

const CodeCouponContainer = styled.View`
    height: 150px;
    margin-bottom: 10px;
`

const CodeCoupon = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(86, 12, 206, 0.1);
    border-radius: 6px;
`
const EndDate = styled.View`
    flex-direction: row;
    align-items: center;
`

const Limitations = styled.View`
    flex-direction: row;
    align-items: center;
`

const AddItem = styled.TouchableOpacity`
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.primary};
    border-radius: 6px;
`