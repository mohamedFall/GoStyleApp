import React, { useContext, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { MainContext } from '../context/MainContext'
import { UserContext } from '../context/UserContext'

export default function Dashboard({ navigation }) {
  const mainContext = useContext(MainContext)
  const [_, setUser] = useContext(UserContext)

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
    <Background>
      {/* <Logo /> */}
      <Header>Let’s Scan</Header>
      <Paragraph>
        Scannez des QR Codes pour ajouter des coupons et bénéficiez d'inombrables et d'incroyables réductions.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Scan') }>
        Scan
      </Button>
      <Button
        mode="outlined"
        onPress={logOut}
      >
        Logout
      </Button>
    </Background>
  )
}
