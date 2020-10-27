import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CohorteRoutes from "../CohorteRoutes/CohorteRoutes";
import PmRoutes from "../PmRoutes/PmRoutes";
import GruposRoutes from "../GruposRoutes/GruposRoutes";
import PerfilRoutes from "../PerfilRoutes/PerfilRoutes";
import CalendarioRoutes from "../CalendarioRoutes/CalendarioRoutes";
import DrawerLayout from "../../components/drawerLayout/DrawerLayout";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading/Loading";
import { GET_COHORTE_USER } from "../../apollo/querys/cohorte";
import { useSelector } from "react-redux";
import { GET_USERS_GROUP } from "../../apollo/querys/groups";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(props) {
  const handleTheme = props.handleTheme;
  const { user } = useSelector((state) => state.auth);

  const { loading, data } = useQuery(GET_COHORTE_USER, {
    variables: {
      where: {
        id: user.id,
      },
    },
  });

  const standUp = useQuery(GET_USERS_GROUP, {
    variables: {
      where: {
        id: user.id,
        Group: {
          type: "standup",
        },
      },
    },
  });

  const pairProgramming = useQuery(GET_USERS_GROUP, {
    variables: {
      where: {
        id: user.id,
        Group: {
          type: "pp",
        },
      },
    },
  });

  return loading || standUp.loading || pairProgramming.loading ? (
    <Loading />
  ) : (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerLayout
          {...props}
          pairProgramming={user.groups}
          cohortes={user.cohortes}
          handleTheme={handleTheme}
        />
      )}
      initialRouteName="CohorteTab"
    >
      {data &&
        data.users[0].cohortes.map((e) => (
          <Drawer.Screen
            initialParams={{ id: e.id }}
            key={e.id}
            name={e.name}
            component={CohorteRoutes}
          />
        ))}
      <Drawer.Screen
        initialParams={{
          id: user.groups[0].id,
          name: user.groups[0].name,
        }}
        name="PmRoutes"
        component={PmRoutes}
      />
      <Drawer.Screen name="CalendarioRoutes" component={CalendarioRoutes} />
      <Drawer.Screen name="PerfilRoutes" component={PerfilRoutes} />
      {user.groups.map((e) => (
        <Drawer.Screen
          initialParams={{ id: e.id }}
          key={e.id}
          name={e.name}
          component={GruposRoutes}
        />
      ))}
    </Drawer.Navigator>
  );
}
