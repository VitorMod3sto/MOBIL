import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Text, IconButton } from "react-native-paper";
import axios from "axios";

export default function HomeScreen({navigation, route}) {
  const [usuarios, setUsuarios] = useState([]);

  // Fazer algo quando usuário entrar na tela e o componente for montado
  useEffect(() => {
    // Tudo que eu quero fazer quando usuário entrar na tela
    // Fazer requisição para buscar usuarios
    axios
      .get("https://dummyjson.com/users")
      .then((resposta) => {
        console.log(resposta.data.users);
        // Recebendo os usuários recebidos em setUsuarios e puxando do data (tudo) os users
        setUsuarios(resposta.data.users);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginBottom: 10 }}
        data={usuarios}
        renderItem={({ item }) => (
          <Card style={{ margin: 8 }}
          onPress={() => navigation.navigate('UsuarioScreen', item.id)}
          >
            <Card.Title
              title={item.firstName + " " + item.lastName}
              subtitle={item.email}
              left={(props) => (
                <Avatar.Image {...props} source={{ uri: item.image }} />
              )}
              right={() => <IconButton icon={"chevron-right"} size={30} />}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
