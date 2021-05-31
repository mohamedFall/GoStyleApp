import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import ScanScreen from '../screens/ScanScreen'
import ItemScannedScreen from '../screens/ItemScannedScreen'

export default ScannerStackScreens = () => {
    const ScannerStack = createStackNavigator()

    return (
        <ScannerStack.Navigator headerMode="none">
            <ScannerStack.Screen name="Scan" component={ScanScreen} />
            <ScannerStack.Screen name="ItemScaned" component={ItemScannedScreen} />
        </ScannerStack.Navigator>
    )
}