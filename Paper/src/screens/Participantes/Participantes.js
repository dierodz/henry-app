import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { useQuery } from "@apollo/client";
import { Avatar,Card } from "react-native-paper";
import ModalAlumns from "../../components/ModalAlumns/ModalAlumns"
import Loading from "../../components/Loading/Loading"
import {GET_USERS_GROUP} from "../../apollo/querys/groups"

export default function Participantes({route}) {
    
    let id = route.params.id
    let type= route.params.screen
    
    const { loading, error, data, refetch,  } = useQuery(GET_USERS_GROUP, {
        variables: {
            "where": {
              [type]: {
                "id": id
              }
            }
          },
    })

    let [modalChange, setModalChange] = React.useState(false)

    return loading? 
    <Loading/>
    :
    <View style={{flex:1}}>
      <ScrollView style={{width:"100%" }}>
        <View style={{ flex: 1, alignItems: 'center', padding:20 }}>
            { data.users.length!=0?data.users.map((e) => (
                <Card onPress={() => (setModalChange({
                    givenName: e.givenName,
                    familyName: e.familyName,
                    nickName: e.nickName,
                    url: e.photoUrl
                }))
                } key={e.id+e.givenName+type+id} style={{ width: "100%", marginBottom: 10 }}>
                    <Card.Title
                        title={e.givenName + " " + e.familyName}
                        subtitle={e.nickName}
                        left={(props) =>{
                            if(e.photoUrl)return <Avatar.Image {...props} source={{ uri: e.photoUrl }}/>
                            return <Avatar.Text {...props} label={e.givenName[0]+e.familyName[0]}/>
                        }}
                    />
                </Card>
                
            ))
            : 
                <Card onPress={()=>alert("SIN ELEMENTOS")} style={{ width: "100%",marginBottom:15 }}>
                <Card.Title
                  title={"SIN ELEMENTOS"}
                />
                </Card>
            }
            <ModalAlumns modalChange={modalChange} setModalChange={setModalChange} />
        </View>
      </ScrollView >
    </View>
}