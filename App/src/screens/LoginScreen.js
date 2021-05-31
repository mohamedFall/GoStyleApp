import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'

import Toast from 'react-native-toast-message'

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

import { MainContext } from '../context/MainContext'
import { UserContext } from '../context/UserContext'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)

  const mainContext = useContext(MainContext)
  const [_, setUser] = useContext(UserContext)

  const onLoginPressed = async () => {
    if (email.value === '' || email.value === null) {
      setEmail({ ...email, error: "Email can't be empty." })
      return false
    } else if (password.value === '' || password.value === null) {
      setPassword({ ...password, error: "Password can't be empty." })
      return false
    } else {
      try {
        const loggedUser = await mainContext.logIn(email.value, password.value)
        if(loggedUser.status == true){
          const user = {
            uid: loggedUser.id,
            firstName: loggedUser.prenom,
            lastName: loggedUser.nom,
            email: loggedUser.email,
            username: loggedUser.username
          }
          const myItems = await mainContext.getMyItems(loggedUser.id)
          mainContext.setCurrentUser(user)
          setUser({
            uid: loggedUser.id,
            firstName: loggedUser.prenom,
            lastName: loggedUser.nom,
            email: loggedUser.email,
            username: loggedUser.username,
            myItems: myItems,   
            isLoggedIn: true
          })
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Oups !',
            text2: loggedUser.message
          })  
        }
      } catch (error) {
        console.log("Error @onLoginPressed ", error)
      } finally {
        // setLoading(false)
      }
    }
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        {loading ? (
            <ActivityIndicator size="small" color="white" />
        ) : (
            "Login"
        )}
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
