import React from 'react';
import Cohorte from '../../screens/Cohorte/Cohorte'
import General from '../../screens/General/General'
import Participantes from '../../screens/Participantes/Participantes'
import Clases from '../../screens/Clases/Clases'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CohorteTabTop = createMaterialTopTabNavigator()



export default function CohorteRoutes() {
    return (
      <CohorteTabTop.Navigator>
        <CohorteTabTop.Screen name="Cohorte" component={Cohorte} />
        <CohorteTabTop.Screen name="Clases" component={Clases} />
        <CohorteTabTop.Screen name="General" component={General} />
        <CohorteTabTop.Screen name="Alumnos" component={Participantes} />
      </CohorteTabTop.Navigator>
    );
  }