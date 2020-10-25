import React from 'react';
import Participantes from '../../screens/Participantes/Participantes'
import General from '../../screens/General/General'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {GET_USERS_GROUP} from "../../apollo/querys/groups"
import {  useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

const PmTabTop = createMaterialTopTabNavigator()


export default function PmRoutes({route}) {

    return (
      <PmTabTop.Navigator>
        <PmTabTop.Screen initialParams={{id: route.params.id, screen:"Group"}} name="Pm"  component={General} />
        <PmTabTop.Screen initialParams={{id: route.params.id, screen:"Group"}}  name="Participantes" component={Participantes} />
      </PmTabTop.Navigator>
    );
  }