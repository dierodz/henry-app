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
import { List } from "react-native-paper";

export default function DrawerLayout(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const paperTheme = useTheme();
  const cohortes = props.cohortes;
  const pairProgramming = props.pairProgramming;

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
        <ProgressBar progress={user.cohortes.length === 0 ? 0: user.cohortes[0].startDate.slice(0)} />
        <Drawer.Section style={styles.drawerSection}>
          <List.Accordion
            style={{ marginHorizontal: 10 }}
            titleStyle={{ marginLeft: 24, fontSize: 14, fontWeight: "500" }}
            title="Cohortes"
            left={(props) => (
              <MaterialCommunityIcons
                name="school"
                color={props.color}
                size={24}
              />
            )}
          >
            {cohortes &&
              cohortes.map((e) => (
                <List.Item
                  key={e.id}
                  title={e.name}
                  onPress={() => props.navigation.navigate(e.name)}
                />
              ))}
          </List.Accordion>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="coffee" color={color} size={size} />
            )}
            label="PM"
            onPress={() => props.navigation.navigate("PmRoutes")}
          />
          <List.Accordion
            style={{ marginHorizontal: 10 }}
            titleStyle={{ marginLeft: 24, fontSize: 14, fontWeight: "500" }}
            title="Grupos"
            left={(props) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                color={props.color}
                size={24}
              />
            )}
          >
            {pairProgramming &&
              pairProgramming.map((e) => (
                <List.Item
                  key={e.id}
                  title={e.name}
                  onPress={() => props.navigation.navigate(e.name)}
                />
              ))}
          </List.Accordion>
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
            onPress={() => props.navigation.navigate("CalendarioRoutes")}
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
            onPress={() => props.navigation.navigate("PerfilRoutes")}
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
    textTransform:"capitalize"
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
