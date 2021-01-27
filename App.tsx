import React from "react";
import { Text, View, FlatList } from "react-native";
import styled from "styled-components/native";
import PressableButton from "./Button";
import axios from "axios";
const api = "https://jsonplaceholder.typicode.com/users";
const anApi = "https://jsonplaceholder.typicode.com/photos";


export default function App() {
  const [data, setData] = React.useState([]);
  const [anotherdata, setanotherData] = React.useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);

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
          onPress={() => true}
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
`;
