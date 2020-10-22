import * as React from "react";
import { View, FlatList} from "react-native";

import {Calendar} from 'react-native-calendars';
import { Card , Button} from "react-native-paper";

import { Subheading } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

  const DATA = [
    {
        id: 'Ante-última Demo',
        title: 'Demo Proyecto Final',
      },
    {
      id: 'Se enseñara react-redux',
      title: 'Lecture: Redux',
    },
    {
        id: 'Se enseñara react-router',
        title: 'Lecture: Router',
    },
    {
        id: 'Se enseñara Hooks',
        title: 'Lecture: Hooks',
    }
  ];


export default function Calendario(props) {
    const { colors } = useTheme();
    let [color,setColor] = React.useState({theme:{calendarBackground:colors.primary}})
    const [cal, setCal] = React.useState(true)
    React.useEffect(()=>{
      setCal(!cal)
      console.log(cal)
    },[colors.primary])

    const renderItem = ({ item }) => (
        <Card style={{marginBottom:5}}>
            <Card.Title title={item.title} subtitle={item.id} />
            <Card.Actions>
            <Button>Descripción</Button>
            </Card.Actions>
        </Card>
      );
  return (
    <View style={{flex: 1,alignItems:"center",justifyContent:"center", alignContent:"center"}}>
        <View style={{width:"90%"}}>
          <Calendar 
          hideExtraDays 
          showWeekNumbers
          theme={{calendarBackground:"red"}}
          markedDates={{
              '2020-10-21' : {selected: true, marked: true, selectedColor: 'blue'},
              '2020-10-17': {marked: true},
              '2020-10-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              '2020-10-19': {disabled: true, disableTouchEvent: true}
            }}
          />
        </View>
          <Button title="bot" onPress={()=>setDate('2020-10-22')}/>
          <View style={{ flex:1 ,width:"90%"}}>
          <Subheading> Próximos: </Subheading>
          <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            /> 
        </View>
    </View>
  );
}

 
