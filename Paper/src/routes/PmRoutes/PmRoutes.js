import React from 'react';
import Participantes from '../../screens/Participantes/Participantes'
import Pm from '../../screens/Pm/Pm'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const PmTabTop = createMaterialTopTabNavigator()


export default function PmRoutes(props) {
    return (
      <PmTabTop.Navigator>
        <PmTabTop.Screen name="Pm" component={Pm} />
        <PmTabTop.Screen name="Participantes" component={Participantes} />
      </PmTabTop.Navigator>
    );
  }