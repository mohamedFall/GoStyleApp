import React, {useContext} from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'

import Toast from 'react-native-toast-message';

import AppStackScreens from './src/stacks/AppStackScreens'

import { UserContext } from './src/context/UserContext'

import { UserProvider } from './src/context/UserContext'
import { MainProvider } from './src/context/MainContext'

export default function App() {

  return (
    <Provider theme={theme}>
      <MainProvider>
          <UserProvider>
            <NavigationContainer>
              <AppStackScreens />
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </NavigationContainer>
          </UserProvider>
      </MainProvider>
    </Provider>
  )
}
