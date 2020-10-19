import * as React from 'react';
import {  View } from 'react-native';
import { Avatar,TextInput , Colors, Subheading,IconButton, Divider, Paragraph, Button, Card, Title} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


export default function Cohorte({ navigation }) {
  const [text, setText] = React.useState('');

    return (
      <>
      <View style={{  flex: 1, padding:20, alignItems: 'center', justifyContent: 'center' }}>
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
          <Button style={{ marginBottom:20 } } mode="outlined" onPress={() => navigation.navigate('Participantes')}>
          
          Participantes
        </Button>
      </View>
      <View style={{ width:"100%", bottom:0,flexDirection:"row" } } >
      <TextInput
          style={{ width:"100%", bottom:0, flex:1, } } 
        label="Postea!"
        value={text}
        onChangeText={text => setText(text)}
        right={<TextInput.Icon name={() =><IconButton
          style={{alignSelf:"center"} } 
          width="100%"
          icon="send"
          size={20}
          onPress={() => console.log('Pressed')}
          />}/>}
      />
      </View>
      </>
    );
}