import React from 'react';
import Cohorte from '../../screens/Cohorte/Cohorte'
import Participantes from '../../screens/Participantes/Participantes'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CohorteTabTop = createMaterialTopTabNavigator()



export default function CohorteRoutes() {
    return (
      <CohorteTabTop.Navigator>
        <CohorteTabTop.Screen name="Cohorte" component={Cohorte} />
        <CohorteTabTop.Screen name="Participantes" component={Participantes} />
      </CohorteTabTop.Navigator>
    );
  }