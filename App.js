import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=151&offset=0";
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();

      const firstGenPokemonDetails = await Promise.all(
        firstGenPokemonIdsBody.results.map(async (p) => {
          const pDetails = await fetch(p.url);

          return await pDetails.json();
        })
      );

      setfirstGenPokemonDetails(firstGenPokemonDetails);
    };

    fetchFirstGenPokemons();
  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <View style={styles.pokemonContainer}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.sprites.front_default,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemóns Primeira Geração</Text>
      <FlatList data={firstGenPokemonDetails} renderItem={renderPokemon} />
      <StatusBar arStyle={'light-content'} backgroundColor="#063970" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#063970",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    marginTop: 20,
    color:'white',
  },
  pokemonContainer: { 
    backgroundColor: "#ADD8E6", 
    marginTop: 10, 
    borderTopLeftRadius:40, borderBottomRightRadius:40, borderTopRightRadius:40,
    marginRight:20,marginLeft:20,
  },
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  }
});
