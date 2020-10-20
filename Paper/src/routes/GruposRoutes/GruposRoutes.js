import React from 'react';
import Grupos from '../../screens/Grupos/Grupos'
import Participantes from '../../screens/Participantes/Participantes'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const GruposTabTop = createMaterialTopTabNavigator()

export default function GruposRoutes(props) {
    return (
      <GruposTabTop.Navigator >
        <GruposTabTop.Screen name="Grupos" component={Grupos} />
        <GruposTabTop.Screen name="Participantes" component={Participantes} />
      </GruposTabTop.Navigator>
    );
  }