import React from "react";
import { Text, View, FlatList } from "react-native";
import styled from "styled-components/native";
import PressableButton from "./Button";
import axios from "axios";
const api = "https://jsonplaceholder.typicode.com/users";
const anApi = "https://jsonplaceholder.typicode.com/photos";
const pokeMonApi = 'https://pokeapi.co/api/v2/pokemon?limit=500'
const urlImage = 'https://pokeres.bastionbot.org/images/pokemon/';
export default function App() {
  const [data, setData] = React.useState([]);
  const [anotherdata, setanotherData] = React.useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [Pokemon, setPokemon] = React.useState([]);

  const updateState = async () => {
    setSelectedTab(0);
    await axios(api)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("failed to catch", err);
      });
  };

  const anoThereState = async () => {
    setSelectedTab(1);
    await axios(anApi)
      .then((res) => {
        setanotherData(res);
      })
      .catch((err) => {
        console.log("failed to catch", err);
      });
  };

  const PokemonState = async () => {
    setSelectedTab(2);
    await axios(pokeMonApi)
      .then((res) => {
        setPokemon(res.data.results);
      })
      .catch((err) => {
        console.log("failed to catch", err);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <PressableButton
          onPress={updateState}
          title="First button"
          bgColor="#4267B2"
        />
        <PressableButton
          onPress={anoThereState}
          title="Second button"
          bgColor="lightblue"
        />
        <PressableButton
          onPress={PokemonState}
          title="Third button"
          bgColor="#4267B2"
        />
      </Container>

      <View style={{ display: selectedTab === 0 ? "flex" : "none" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>First Button</Text>
        {data && data === undefined ? (
          <Text>loading</Text>
        ) : (
            <FlatList
              data={data}
              keyExtractor={({ item }) => item?.id}
              renderItem={({ item }) => <View key={item.id}><Text>{item.name}</Text></View>}
            />
          )}
      </View>

      <View style={{ display: selectedTab === 1 ? "flex" : "none" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Second Button
          </Text>
        {anotherdata && anotherdata === undefined ? (
          <Text>loading</Text>
        ) : (
            // <AnData andata={anotherdata} />
            <FlatList
              data={anotherdata.data}
              renderItem={({ item }) => <Text>{item.title}</Text>}
            />
          )}
      </View>
      <View style={{ display: selectedTab === 2 ? "flex" : "none" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Third Button
          </Text>
        {Pokemon && Pokemon === undefined ? (
          <Text>loading</Text>
        ) : (
            <FlatList
              numColumns={2}
              data={Pokemon}
              renderItem={({ item }) => {
                let url = item.url;
                const idPokemon = url.split('https://pokeapi.co/api/v2/pokemon/');
                const link = urlImage + idPokemon[1].substring(0, idPokemon[1].length - 1) + ".png";
                return <Item>
                  <Image
                    resizeMode="contain"
                    source={{ uri: link }}
                  />
                  <TextName>{item.name}</TextName>
                </Item>
              }}
              keyExtractor={item => `key-${item.name}`}
            />
          )}
      </View>

    </React.Fragment>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 70px 0px 20px 0px;
`;

const Image = styled.Image`
width: 100px;
height: 100px;
`;

const Item = styled.View`
padding:4px;
flex: 1;
justify-content: center;
align-items: center;
background-color: white;
margin-top: 8px;
margin-horizontal: 5px;
shadowColor: #000;
shadow-opacity: 0.25;
shadow-radius: 3.84px;
elevation: 5;
`
const TextName = styled.Text`
color: orange;
font-weight: bold;
`
