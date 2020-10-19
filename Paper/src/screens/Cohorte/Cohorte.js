import * as React from 'react';
import {  View } from 'react-native';
import { Avatar, Subheading,IconButton, Divider, Paragraph, Button, Card, Title} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


export default function Cohorte({ navigation }) {
    return (
      <View style={{ flex: 1, padding:20, alignItems: 'center', justifyContent: 'center' }}>
          <Paragraph>COHORTE</Paragraph>
          <Card style={{ width:"100%"}}>
          <Card.Title
              title="Ernesto Gonzalez"
              subtitle="Apodo"
              left={(props) => <Avatar.Text {...props} label="EG" />}
              right={(props) => <IconButton {...props} icon={({ color, size }) => (
                <MaterialIcons
                  name="more-vert"
                  color={color}
                  size={size}
                />
              )} onPress={() => {}} />}
            />
            <Card.Content>
      <Title>Libreria de React-native</Title>
      <Paragraph>les paso la libreria de react native</Paragraph>
          </Card.Content>  
          </Card>
      </View>
    );
}