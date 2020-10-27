/* eslint-disable react/prop-types */
import * as React from "react";
import { View } from "react-native";
import {
  Avatar,
  TextInput,
  Button,
  Caption,
  IconButton,
  HelperText
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { GoogleInitialize, signInWithEmail } from "../../dispatchers/auth";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();



  let[input, setInput] = React.useState({email:"", password:""})
  let[error, setError] = React.useState({email:false,password:false})


  const [isPrivate, setPrivate] = React.useState(true);

  function validate(value){
    let error={email:false, password:false}

    if(!/\S+@\S+\.\S+/.test(value.email)){
      error.email = true
    }
    if(value.password.length < 9){
      error.password = true
    }
    return error;
  }

  function handleChange( type, value){
    setError(validate({...input,[type]: value}))
    setInput({...input,[type]: value})
  }

  const handleSubmit = () => {
    dispatch(signInWithEmail(input.email.trim().toLowerCase(), input.password));
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
          value={input.email}
          onChangeText={(email) => handleChange("email", email)}
          style={{ marginBottom: 5 }}
        />
        <HelperText style={{ marginBottom:15}} type="error" visible={error.email}>
            Introduce un email valido
        </HelperText>
        <TextInput
          mode="outlined"
          label="Password"
          value={input.password}
          onChangeText={(password) => {
            !isPrivate && setPrivate(true);
            handleChange("password", password);
          }}
          style={{ marginBottom: 5 }}
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
        <HelperText type="error" style={{marginBottom:25}} visible={error.password}>
            La contraseña debe tener al menos 9 caracteres
        </HelperText>
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

{/*           <IconButton
            icon={({ color }) => (
              <AntDesign name="github" size={24} color={color} />
            )}
            onPress={() => alert("github")}
          /> */}
        </View>
      </View>
    </View>
  );
}
