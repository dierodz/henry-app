import React from 'react';
import Grupos from '../../screens/Grupos/Grupos'
import Participantes from '../../screens/Participantes/Participantes'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import General from '../../screens/General/General'

const GruposTabTop = createMaterialTopTabNavigator()

export default function GruposRoutes(props) {
    return (
      <GruposTabTop.Navigator >
        {[{id:1, title:"Grupo1"},{id:2, title:"Grupo2"}].map((e)=>(<>
          <GruposTabTop.Screen name={e.title} component={General} />
          <GruposTabTop.Screen name={e.title} component={Participantes} />
          </>))}
        
      </GruposTabTop.Navigator>
    );
  }