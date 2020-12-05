import React from 'react';
import UserFlow from './UserFlow'
import { NavigationContainer } from '@react-navigation/native'
import MyTabs from './BottomNavigation'


function Navigation() {
    return (
        <NavigationContainer>
                <UserFlow />
                
        </NavigationContainer>
        
    )
}

export default Navigation