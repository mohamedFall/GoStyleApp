import React, {useContext} from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from '../screens'

export default AuthStackScreens = () => {
    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="StartScreen" component={StartScreen} />
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
            <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
            <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </AuthStack.Navigator>
    )
}

