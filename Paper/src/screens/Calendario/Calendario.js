import * as React from "react";
import { View, FlatList, ScrollView} from "react-native";

import {Calendar} from 'react-native-calendars';
import { Card , Button} from "react-native-paper";

import { Subheading } from 'react-native-paper';

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

    const renderItem = ({ item }) => (
        <Card style={{marginBottom:5}}>
            <Card.Title title={item.title} subtitle={item.id} />
            <Card.Actions>
            <Button>Descripción</Button>
            </Card.Actions>
        </Card>
      );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
     <View style={{flex:.7, margin:10}}>
          <Calendar 
          hideExtraDays 
          showWeekNumbers
          style={{width:"100%", marginBottom:10}}
          markedDates={{
              '2020-10-21' : {selected: true, marked: true, selectedColor: 'blue'},
              '2020-10-17': {marked: true},
              '2020-10-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              '2020-10-19': {disabled: true, disableTouchEvent: true}
            }}
          />
        </View >
          <View style={{flex:.3,width:"100%",height:"100%", paddingVertical:10}}>
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

 
