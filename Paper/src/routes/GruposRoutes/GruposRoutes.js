import React from 'react';
import Grupos from '../../screens/Grupos/Grupos'
import Participantes from '../../screens/Participantes/Participantes'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import General from '../../screens/General/General'

const GruposTabTop = createMaterialTopTabNavigator()

export default function GruposRoutes({route}) {
    return (
      <GruposTabTop.Navigator >
          <GruposTabTop.Screen initialParams={{id: route.params.id, screen:"Group"}} name={"General"} component={General} />
          <GruposTabTop.Screen initialParams={{id: route.params.id, screen:"Group"}} name={"Participantes"} component={Participantes} />  
      </GruposTabTop.Navigator>
    );
  }