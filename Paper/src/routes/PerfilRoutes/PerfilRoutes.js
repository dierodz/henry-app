import React from 'react';
import Perfil from '../../screens/Perfil/Perfil'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const PerfilTabTop = createMaterialTopTabNavigator()

export default function PerfilRoutes() {
    return (
      <PerfilTabTop.Navigator >
        <PerfilTabTop.Screen name="Perfil" component={Perfil} />
      </PerfilTabTop.Navigator>
    );
  }