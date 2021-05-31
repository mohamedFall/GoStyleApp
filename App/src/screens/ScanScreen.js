import React, { useState, useContext }from 'react'
import {Linking, Alert} from 'react-native'

import Toast from 'react-native-toast-message'
import QRCodeScanner from 'react-native-qrcode-scanner'
import styled from 'styled-components/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../components/Text'

import { theme } from '../core/theme'

import Button from '../components/Button'

import { MainContext } from '../context/MainContext'
import { UserContext } from '../context/UserContext'

export default ScanScreen = ({navigation}) => {
    const [user, setUser] = useContext(UserContext)
    const [isloading, setIsLoading] = useState(false)

    const mainContext = useContext(MainContext)

    const ifScaned = e =>{
        let qrCode = e.data 
        if(qrCode.startsWith("GoStyle#")){
            setIsLoading(true)
            qrCode = qrCode.split("#");
            const itemId = qrCode[1];
            setTimeout(() => {
                mainContext.getItem(itemId)
                .then((item) => {
                    console.log(item)
                    setIsLoading(false)
                    navigation.navigate("ItemScaned", {item: item})
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.log("Error @GettingScannedItem " + error)
                });
            }, 200)
        }else{
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Oups !',
                text2: "Ce QR Code n'est pas valide pour l'application"
            });
        }
    }

    const renderLoadingOverlay = () => {
        return (
            <LoadingOverlay>
                <Loading />
            </LoadingOverlay>
        )
    }

    return(
        <Container>
            <Main>
                <Header>
                    <Text numberOfLines={1} medium heavy color={theme.colors.primary}>Scanner un QRCode</Text>
                </Header>
                <QRCodeScanner
                    containerStyle={{height: '100%'}}
                    onRead={ifScaned}
                    cameraStyle={{height: '100%'}}
                    permissionDialogMessage="Need permissions to access camera"
                    reactivate={true}
                    reactivateTimeout={5000}
                    showMarker={true}
                    markerStyle={{borderColor: "#FFF", borderRadius: 10}}
                />
                { isloading && (
                    renderLoadingOverlay()
                )}
            </Main>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
`

const Header = styled.View`
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    z-index: 9999;
`

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: "#fff",
    size: "large"
}))`
`

const Main = styled.View`
    flex: 1;
`

const LoadingOverlay = styled.View`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 999;
    justify-content: center;
    align-items: center;
`