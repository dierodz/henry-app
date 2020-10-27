import React from 'react';
import Clases from '../../screens/Clases/Clases'
import ContentRoutes from "./ContentRoutes"
import { createStackNavigator } from '@react-navigation/stack';
import {GET_MODULES} from "../../apollo/querys/modulos"
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading/Loading"
import * as ScreenOrientation from 'expo-screen-orientation';
import { DeviceMotion } from 'expo-sensors';

const ClasesTabTop = createStackNavigator()

export default function ClasesRoutes({route}) {

/*     let [heightTab, setHeightTab] = React.useState(5)
    let [prueba, setPrueba] = React.useState(false)
    
    ScreenOrientation.addOrientationChangeListener((e)=>{
        setPrueba(true)
        e.orientationInfo.orientation ===1? setHeightTab(20):setHeightTab(5)
        setPrueba(false)
        }
    )
     */

    const { loading, error, data, refetch } = useQuery(GET_MODULES, {
        variables: { id: route.params.id },
    }) 
   
    return loading?
      <Loading/>
      :
      <ClasesTabTop.Navigator >
        <ClasesTabTop.Screen  options={{headerShown:false}} initialParams={{modules:data.cohortes[0].modules}} name="Clases" component={Clases} />
        {data&&data.cohortes[0].modules.map((modulo)=>(
            modulo.contents.map((clase)=>(
                <ClasesTabTop.Screen options={{ headerStyle:{height:40}}} key={clase.id} initialParams={{id:clase.id, readme: clase.readme, durationTime:clase.durationTime}} name={clase.topicName} component={ContentRoutes} />
            ))
        ))}
      </ClasesTabTop.Navigator>
  }