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

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(props) {
  const handleTheme = props.handleTheme;
  const { user } = useSelector((state) => state.auth);

  const { loading, error, data, refetch } = useQuery(GET_COHORTE_USER, {
    variables: {
      where: {
        id: user.id,
      },
    },
  });

  return loading ? (
    <Loading />
  ) : (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerLayout
          {...props}
          cohortes={data && data?.users[0]?.cohortes}
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
      <Drawer.Screen name="PmRoutes" component={PmRoutes} />
      <Drawer.Screen name="CalendarioRoutes" component={CalendarioRoutes} />
      <Drawer.Screen name="PerfilRoutes" component={PerfilRoutes} />
      {[
        { id: 1, title: "Grupo1" },
        { id: 2, title: "Grupo2" },
      ].map((e) => (
        <Drawer.Screen key={e.id} name={e.title} component={GruposRoutes} />
      ))}
    </Drawer.Navigator>
  );
}
