import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar,Card } from "react-native-paper";
import ModalAlumns from "../../components/ModalAlumns/ModalAlumns"


export default function Participantes({route, navigation}) {
    let id = route.params.id
    let type= route.params.screen
    let data = route.params.user

    let [modalChange, setModalChange] = React.useState(false)
    return <View style={{flex:1}}>
      <ScrollView style={{width:"100%" }}>
        <View style={{ flex: 1, alignItems: 'center', padding:20 }}>
            { data.length!=0?data.map((e) => (
                <Card onPress={() => (setModalChange({
                    givenName: e.givenName,
                    familyName: e.familyName,
                    nickName: e.nickName,
                    url: e.photoUrl,
                    id:e.id,
                    email: e.email
                }))
                } key={e.id+e.givenName+type+id} style={{ width: "100%", marginBottom: 10 }}>
                    <Card.Title
                        title={e.givenName.charAt(0).toUpperCase()+e.givenName.slice(1) + " " + e.familyName.charAt(0).toUpperCase()+e.familyName.slice(1)}
                        subtitle={e.nickName}
                        left={(props) =>{
                            if(e.photoUrl)return <Avatar.Image {...props} source={{ uri: e.photoUrl }}/>
                            return <Avatar.Text {...props} label={e.givenName[0]+e.familyName[0]}/>
                        }}
                    />
                </Card>
                
            ))
            : 
                <Card style={{ width: "100%",marginBottom:15 }}>
                <Card.Title
                  title={e.givenName + " " + e.familyName}
                  subtitle={e.nickName}
                  left={(props) => {
                    if (e.photoUrl)
                      return (
                        <Avatar.Image {...props} source={{ uri: e.photoUrl }} />
                      );
                    return (
                      <Avatar.Text
                        {...props}
                        label={e.givenName[0] + e.familyName[0]}
                      />
                    );
                  }}
                />
                </Card>
            }
            <ModalAlumns navigation={navigation} modalChange={modalChange} setModalChange={setModalChange} />
        </View>
      </ScrollView>
    </View>
}
