/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { signOut } from "../../dispatchers/auth";
import {
  useTheme,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  ProgressBar,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../userImage/UserImage";

export default function DrawerLayout(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const paperTheme = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <UserImage {...user} />
          <Title style={styles.title}>
            {user.givenName + " " + user.familyName}
          </Title>
          <Caption style={styles.caption}>
            {user.cohortes.length === 0 ? "" : user.cohortes[0].name}
          </Caption>
        </View>
        <ProgressBar progress={0.5} />

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="school" color={color} size={size} />
            )}
            label="Cohorte"
            onPress={() => props.navigation.navigate("CohorteRoutes")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                color={color}
                size={size}
              />
            )}
            label="Grupos"
            onPress={() => props.navigation.navigate("GruposRoutes")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="coffee" color={color} size={size} />
            )}
            label="PM"
            onPress={() => props.navigation.navigate("PmRoutes")}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar"
                color={color}
                size={size}
              />
            )}
            label="Calendario"
            onPress={() => {}}
          />
        </Drawer.Section>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Mi Perfil"
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Configuración"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Estilo">
          <TouchableRipple onPress={() => props.handleTheme()}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={paperTheme.dark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>

        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout-variant"
                color={color}
                size={size}
              />
            )}
            label="LogOut"
            onPress={() => dispatch(signOut())}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
