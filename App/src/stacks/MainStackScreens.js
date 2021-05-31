import React, {useContext} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../core/theme'
import { Dashboard } from '../screens'
import ScanScreen from '../screens/ScanScreen'
import ItemStackScreens from './ItemStackScreens'
import ScannerStackScreens from './ScannerStackScreens'
import ProfileScreen from '../screens/ProfileScreen'

export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator()

    const tabBarOptions = {
        style: {
            backgroundColor: "#fff",
        },
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.text,
    }

    const screenOptions = (( { route }) => ({
        tabBarIcon: ({focused}) => {
            let iconName = "home-outline"

            switch(route.name) {
                case "Dashboard":
                    iconName = "home-outline"
                    break
                
                case "Items":
                    iconName = "list-outline"
                    break

                case "Scan":
                    iconName = "camera-outline"
                    break

                case "Profile":
                    iconName = "person-outline"
                    break

                default:
                    iconName = "home-outline"
            }

            return <Icon name={iconName} size={24} color={focused ? theme.colors.primary : theme.colors.text} />
        }
    }))

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen name="Dashboard" component={Dashboard} />
            <MainStack.Screen name="Items" component={ItemStackScreens} />
            <MainStack.Screen name="Scan" component={ScannerStackScreens} />
            <MainStack.Screen name="Profile" component={ProfileScreen} />
        </MainStack.Navigator>
    )
}