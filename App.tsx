import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';
import PressableButton from './Button';
import axios from 'axios';
const api = "https://jsonplaceholder.typicode.com/users";
const anApi = "https://jsonplaceholder.typicode.com/photos"

const Data = ({ data }) => {

  return (
    <View style={{ flex: 1 }}>
      <Text>{JSON.stringify(data, null, 4)}</Text>
    </View>
  )
}
const AnData = ({ andata }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{JSON.stringify(andata, null, 1)}</Text>
    </View>
  )
}

export default function App() {
  const [data, setData] = React.useState([]);
  const [anotherdata, setanotherData] = React.useState([]);


  const updateState = async () => {
    await axios(api)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("failed to catch", err);
      });
  };

  const anoThereState = async () => {
    await axios(anApi)
      .then((res) => {
        setanotherData(res);
      })
      .catch((err) => {
        console.log("failed to catch", err);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <PressableButton onPress={updateState} title='First button' bgColor='#4267B2' />
        <PressableButton onPress={anoThereState} title='Second button' bgColor='lightblue' />
        <PressableButton onPress={() => true} title='Third button' bgColor='#4267B2' />
      </Container>
      <Scroll>
        {data && data === undefined ? <Text>loading</Text> : <Data data={data} />}
        {anotherdata && anotherdata === undefined ? <Text>loading</Text> : <AnData andata={anotherdata} />}
      </Scroll>
    </React.Fragment>
  );
}

const Container = styled.View`

 flex-direction: row;
 justify-content: center;
 padding: 70px 0px 20px 0px;
`;

const Scroll = styled.ScrollView`
flex: 1;
`
