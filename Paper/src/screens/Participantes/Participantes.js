import * as React from 'react';
import { View } from 'react-native';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Card, Avatar } from "react-native-paper";
import ModalAlumns from "../../components/ModalAlumns/ModalAlumns"

export default function Participantes(props) {
    const getUsers = gql`
    query Users($id: Int) {
        cohortes(id: $id) {
            name
            users{
            id
            givenName
            familyName
            nickName
            photoUrl
            }
        }
    }
    `;
    let id = props.route.params.screen === "cohorte" ? 2 : 4

    const { loading, error, data, refetch } = useQuery(getUsers, {
        variables: { id: id },
    })


    let [modalChange, setModalChange] = React.useState(false)

    return (<View style={{ flex: 1, alignItems: 'center' }}>
        {data && data.cohortes[0].users.map((e) => (
            <Card onPress={() => (setModalChange({
                name: e.givenName + " " + e.familyName,
                nickName: e.nickName,
                url: e.photoUrl
            }))
            } key={e.id} style={{ width: "100%", marginBottom: 10 }}>
                <Card.Title
                    title={e.givenName + " " + e.familyName}
                    subtitle={e.nickName}
                    left={(props) => <Avatar.Image {...props} source={{ uri: e.photoUrl }}
                    />}
                />
            </Card>
        ))}
        <ModalAlumns modalChange={modalChange} setModalChange={setModalChange} />
    </View>
    );
}