import * as React from 'react';
import { Card, Avatar, Modal, Button, Portal } from "react-native-paper";
import * as Linking from 'expo-linking'

export default function ModalAlumns({ modalChange, setModalChange, navigation }) {

    return (<Portal >
        <Modal
            contentContainerStyle={{ alignItems: "center" }}
            visible={modalChange}
            onDismiss={() => setModalChange(false)}
        >
            <Card style={{ width: "80%" }}>
                {modalChange.url?
                    <Avatar.Image style={{ alignSelf: "center", margin: 10 }} source={{ uri: modalChange.url }} />
                    :
                    <Avatar.Text style={{ alignSelf: "center", margin: 10 }} label={modalChange?modalChange.givenName[0]+modalChange.familyName[0]:"H"} />
                    }
                {modalChange.givenName&&<Card.Title
                    title={`${modalChange.givenName.charAt(0).toUpperCase() + modalChange.givenName.slice(1)} ${modalChange.familyName.charAt(0).toUpperCase() + modalChange.familyName.slice(1)}`}
                    subtitle={modalChange.nickName}
                />}
                <Card.Content>
                </Card.Content>
                <Card.Actions style={{ alignSelf: "center", margin: 10 }}>
                    <Button onPress={() =>{
                        Linking.openURL(`mailto:${modalChange.email}` )
                        setModalChange(false)
                        ;}}>Email</Button>
                        <Button onPress={() =>{
                        navigation.navigate(modalChange.givenName+modalChange.familyName+modalChange.id)
                        setModalChange(false)
                        }}
                        >Chatea</Button>
                </Card.Actions>
            </Card>
        </Modal>
    </Portal>

    );
}