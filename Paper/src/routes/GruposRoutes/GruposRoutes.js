import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Grupos from '../../screens/Grupos/Grupos'
import Participantes from '../../screens/Participantes/Participantes'

const GruposTabTop = createStackNavigator()

export default function GruposRoutes(props) {
    return (
      <GruposTabTop.Navigator>
        <GruposTabTop.Screen name="Grupos" component={Grupos} />
        <GruposTabTop.Screen name="Participantes" component={Participantes} />
      </GruposTabTop.Navigator>
    );
  }