import React from 'react';
import Cohorte from '../../screens/Cohorte/Cohorte'
import General from '../../screens/General/General'
import Participantes from '../../screens/Participantes/Participantes'
import Clases from '../../screens/Clases/Clases'
import ClasesRoutes from "../ClasesRoutes/ClasesRoutes"
import ParticipantesRoutes from "../ParticipantesRoutes/ParticipantesRoutes"


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CohorteTabTop = createMaterialTopTabNavigator()

export default function CohorteRoutes({route}) {

    return (
      <CohorteTabTop.Navigator>
        <CohorteTabTop.Screen initialParams={{id: route.params.id}} name="Cohorte"  component={Cohorte} />
        <CohorteTabTop.Screen initialParams={{id: route.params.id}} name="Clases" component={ClasesRoutes} />
        <CohorteTabTop.Screen initialParams={{id: route.params.id,screen:"Cohorte"}} name="General" component={General} />
        <CohorteTabTop.Screen initialParams={{id: route.params.id,screen:"Cohorte"}} name="Alumnos" component={ParticipantesRoutes} />
      </CohorteTabTop.Navigator>
    );
  }