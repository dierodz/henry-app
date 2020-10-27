import React from 'react';
import Vimeo from '../../screens/Vimeo/Vimeo'
import Readme from '../../screens/Readme/Readme'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ClasesTabTop = createMaterialTopTabNavigator()

export default function ContentRoutes({route}) {
    return (
      <ClasesTabTop.Navigator tabBarOptions={{tabStyle:{height:40}}} >
        <ClasesTabTop.Screen initialParams={{readme:route.params.readme}} name="Readme" component={Readme} />
        <ClasesTabTop.Screen initialParams={{durationTime:route.params.durationTime}} name="Video" component={Vimeo} />
      </ClasesTabTop.Navigator>
    );
  }