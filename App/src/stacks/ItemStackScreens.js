import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import ListItemsScreen from '../screens/ListItemsScreen'
import ItemScreen from '../screens/ItemScreen'

export default ProfileStackScreens = () => {
    const ItemStack = createStackNavigator()

    return (
        <ItemStack.Navigator headerMode="none">
            <ItemStack.Screen name="Items" component={ListItemsScreen} />
            <ItemStack.Screen name="Item" component={ItemScreen} />
        </ItemStack.Navigator>
    )
}