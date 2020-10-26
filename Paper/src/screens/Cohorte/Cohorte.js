import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Title, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import Hyperlink from "react-native-hyperlink";

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize",
  },
});

export default function Cohorte() {
  const { user } = useSelector((state) => state.auth);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
      <Card style={{ width: "100%" }}>
        <Card.Title
          style={styles.title}
          title={user.givenName + " " + user.familyName}
          subtitle={user.nickName}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: user.photoUrl }} />
          )}
        />
        <Card.Content>
          <Title>Libreria de React-native</Title>
          <Hyperlink
            linkDefault={true}
            linkStyle={{ color: "#2980b9", fontSize: 16 }}
          >
            <Text>
              Les paso la libreria de react native: https://reactnative.dev/
            </Text>
          </Hyperlink>
        </Card.Content>
      </Card>
    </View>
  );
}
