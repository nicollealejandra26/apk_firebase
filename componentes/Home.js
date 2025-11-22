import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function Home() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const obtenerPersonajes = async () => {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const json = await res.json();
      setPersonajes(json.results);
    };
    obtenerPersonajes();
  }, []);

  return (
    <ScrollView>
      <View style={styles.lista}>
        {personajes.map((pj) => (
          <View key={pj.id} style={styles.item}>
            <Text>{pj.name}</Text>
            <Image source={{ uri: pj.image }} style={styles.imagen} />
            <Text>{pj.status} - {pj.species}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    backgroundColor: 'lavender',
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 5,
  },
});
