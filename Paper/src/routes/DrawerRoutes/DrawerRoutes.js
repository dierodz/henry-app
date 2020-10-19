import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CohorteRoutes from '../CohorteRoutes/CohorteRoutes'
import PmRoutes from '../PmRoutes/PmRoutes'
import GruposRoutes from '../GruposRoutes/GruposRoutes'
import Settings from '../../screens/Settings/Settings'
import DrawerLayout from '../../components/DrawerLayout/DrawerLayout'

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(props){
    handleTheme=props.handleTheme
    return(<Drawer.Navigator  drawerContent={props=><DrawerLayout {...props} handleTheme={handleTheme} />} initialRouteName="CohorteTab">
            <Drawer.Screen name="CohorteRoutes" component={CohorteRoutes} />
            <Drawer.Screen name="GruposRoutes" component={GruposRoutes} />
            <Drawer.Screen name="PmRoutes" component={PmRoutes} />
            <Drawer.Screen name="Settings" component={Settings} />
         </Drawer.Navigator>)
}