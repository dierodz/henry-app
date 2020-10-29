import * as React from "react";
import { View, ScrollView } from "react-native";
import { Card, List, Paragraph} from "react-native-paper";
import Markdown from 'react-native-simple-markdown'
import {  StyleSheet } from "react-native";
import { useTheme } from 'react-native-paper';


export default function Readme({route}) {

  const { colors } = useTheme();

    const markdownStyles = StyleSheet.create({
    heading1: {
      fontSize: 24,
      color: colors.text,
    },
    link: {
      color: colors.text,
    },
    mailTo: {
      color: colors.text,
    },
    text: {
      color: colors.text,
    },
  })
 
  return <View
      style={{
        flex: 1,
      }}
    >
     <ScrollView style={{width:"100%" }}>
     <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
      
        <Markdown styles={markdownStyles}>
          {route.params.readme}
        </Markdown>   
      </View>
    </ScrollView >
  </View> 
}
