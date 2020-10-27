import * as React from 'react';
import { Card, Avatar, Modal, Button, Portal } from "react-native-paper";


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
                <Card.Title
                    title={`${modalChange.givenName} ${modalChange.familyName}`}
                    subtitle={modalChange.nickName}
                />
                <Card.Content>
                </Card.Content>
                <Card.Actions style={{ alignSelf: "center", margin: 10 }}>
                    <Button onPress={() =>{
                        setModalChange(false)
                        navigation.navigate(modalChange.givenName+modalChange.familyName+modalChange.id)}}>Chatea</Button>
                </Card.Actions>
            </Card>
        </Modal>
    </Portal>

    );
}