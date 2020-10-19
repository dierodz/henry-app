import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Participantes from '../../screens/Participantes/Participantes'
import Pm from '../../screens/Pm/Pm'

const PmTabTop = createStackNavigator()

export default function PmRoutes(props) {
    return (
      <PmTabTop.Navigator>
        <PmTabTop.Screen name="Pm" component={Pm} />
        <PmTabTop.Screen name="Participantes" component={Participantes} />
      </PmTabTop.Navigator>
    );
  }