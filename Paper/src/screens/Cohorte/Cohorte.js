/* eslint-disable react/prop-types */
import * as React from "react";
import { View } from "react-native";
import {
  Avatar,
  Subheading,
  IconButton,
  Divider,
  Paragraph,
  Button,
  Card,
  Title,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function Cohorte({ navigation }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paragraph>COHORTE</Paragraph>
      <Card style={{ width: "100%" }}>
        <Card.Title
          title={user.givenName + " " + user.familyName}
          subtitle={user.nickName}
          left={(props) => <Avatar.Text {...props} label="EG" />}
          right={(props) => (
            <IconButton
              {...props}
              icon={({ color, size }) => (
                <MaterialIcons name="more-vert" color={color} size={size} />
              )}
              onPress={() => {}}
            />
          )}
        />
        <Card.Content>
          <Title>Libreria de React-native</Title>
          <Paragraph>les paso la libreria de react native</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}
