/* eslint-disable react/prop-types */
import * as React from "react";
import { View } from "react-native";
import {
  Avatar,
  TextInput,
  Button,
  Caption,
  IconButton,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { GoogleInitialize, signInWithEmail } from "../../dispatchers/auth";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const initialForm = {
    email: "",
    password: "",
  };
  const [{ email, password }, handleInputChange] = useForm(initialForm);

  const [isPrivate, setPrivate] = React.useState(true);

  const handleSubmit = () => {
    dispatch(signInWithEmail(email.trim().toLowerCase(), password));
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <Avatar.Text
          style={{ alignSelf: "center", marginVertical: 30 }}
          label="H"
        />
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email) => handleInputChange("email", email)}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(password) => {
            !isPrivate && setPrivate(true);
            handleInputChange("password", password);
          }}
          style={{ marginBottom: 30 }}
          secureTextEntry={isPrivate}
          right={
            <TextInput.Icon
              name={() => (
                <IconButton
                  style={{ alignSelf: "center" }}
                  width="100%"
                  icon="eye"
                  size={20}
                  onPress={() => setPrivate(false)}
                />
              )}
            />
          }
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ marginBottom: 20 }}
        >
          Sign-In
        </Button>
        <Caption style={{ marginBottom: 10 }}>Recupera tu contraseña</Caption>
        <Button
          style={{ marginBottom: 20 }}
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          Recuperar contraseña
        </Button>
        <Caption style={{ marginBottom: 10 }}>¿Primer ingreso?</Caption>
        <Button
          style={{ marginBottom: 20 }}
          mode="outlined"
          onPress={() => navigation.navigate("SignUp")}
        >
          ¡Registrate!
        </Button>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <IconButton
            icon={({ color }) => (
              <AntDesign name="google" color={color} size={24} />
            )}
            onPress={() => dispatch(GoogleInitialize())}
          />

          <IconButton
            icon={({ color }) => (
              <AntDesign name="github" size={24} color={color} />
            )}
            onPress={() => alert("github")}
          />
        </View>
      </View>
    </View>
  );
}
