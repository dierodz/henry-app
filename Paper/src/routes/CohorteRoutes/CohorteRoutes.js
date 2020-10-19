import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cohorte from '../../screens/Cohorte/Cohorte'
import Participantes from '../../screens/Participantes/Participantes'

const CohorteTabTop = createStackNavigator()

export default function CohorteRoutes() {
    return (
      <CohorteTabTop.Navigator>
        <CohorteTabTop.Screen name="Cohorte" component={Cohorte} />
        <CohorteTabTop.Screen name="Participantes" component={Participantes} />
      </CohorteTabTop.Navigator>
    );
  }