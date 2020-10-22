import React from 'react';
import Calendario from '../../screens/Calendario/Calendario'
import General from '../../screens/General/General'
import Participantes from '../../screens/Participantes/Participantes'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CalendarioTabTop = createMaterialTopTabNavigator()

export default function CohorteRoutes() {
    return (
      <CalendarioTabTop.Navigator>
        <CalendarioTabTop.Screen name="Calendario" component={Calendario} />
      </CalendarioTabTop.Navigator>
    );
  }