/* eslint-disable react/prop-types */
import * as React from "react";
import { View } from "react-native";
import { Avatar, TextInput, Button, Caption } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { signInWithEmail } from "../../dispatchers/auth";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const initialForm = {
    email: "",
    password: "",
  };
  const [{ email, password }, handleInputChange] = useForm(initialForm);

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
          onChangeText={(password) => handleInputChange("password", password)}
          style={{ marginBottom: 30 }}
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
          <AntDesign
            style={{ marginHorizontal: 15 }}
            name="github"
            size={24}
            color="black"
          />
          <AntDesign
            style={{ marginHorizontal: 15 }}
            name="google"
            size={24}
            color="black"
          />
        </View>
      </View>
    </View>
  );
}
