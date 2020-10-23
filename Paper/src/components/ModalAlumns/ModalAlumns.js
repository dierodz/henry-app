import * as React from 'react';
import { Card, Avatar, Modal, Button, Portal } from "react-native-paper";

export default function Participantes({ modalChange, setModalChange }) {

    return (<Portal >
        <Modal
            contentContainerStyle={{ alignItems: "center" }}
            visible={modalChange}
            onDismiss={() => setModalChange(false)}
        >
            <Card style={{ width: "80%" }}>
                <Avatar.Image style={{ alignSelf: "center", margin: 10 }} source={{ uri: modalChange.url }} />
                <Card.Title
                    title={modalChange.name}
                    subtitle={modalChange.nickName}
                />
                <Card.Content>
                </Card.Content>
                <Card.Actions style={{ alignSelf: "center", margin: 10 }}>
                    <Button onPress={() => alert("Chatea")}>Chatea</Button>
                </Card.Actions>
            </Card>
        </Modal>
    </Portal>

    );
}