import React from 'react';
import Participantes from '../../screens/Participantes/Participantes'
import General from '../../screens/General/General'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const PmTabTop = createMaterialTopTabNavigator()


export default function PmRoutes(props) {
    return (
      <PmTabTop.Navigator>
        <PmTabTop.Screen name="Pm" initialParams={{screen:"Pm"}} component={General} />
        <PmTabTop.Screen name="Participantes" initialParams={{screen:"Pm"}} component={Participantes} />
      </PmTabTop.Navigator>
    );
  }