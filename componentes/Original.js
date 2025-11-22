import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';

export default function Original() {
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState(null);

  const obtenerPersonaje = async () => {
    setLoading(true);
    setResultado(null);
    const id = Math.floor(Math.random() * 826) + 1;
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await res.json();
      setPersonaje(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el personaje');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPersonaje();
  }, []);

  const adivinar = (opcion) => {
    if (opcion === personaje.status) {
      setResultado('✅ ¡Correcto!');
    } else {
      setResultado(`❌ Incorrecto. Era: ${personaje.status}`);
    }
  };

  if (loading || !personaje) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Está vivo o muerto?</Text>
      <Image source={{ uri: personaje.image }} style={styles.imagen} />
      <Text style={styles.nombre}>{personaje.name}</Text>
      <View style={styles.botones}>
        <Button title="Vivo" onPress={() => adivinar("Alive")} />
        <Button title="Muerto" onPress={() => adivinar("Dead")} />
      </View>
      {resultado && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.resultado}>{resultado}</Text>
          <Button title="Siguiente personaje" onPress={obtenerPersonaje} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  imagen: { width: 200, height: 200, borderRadius: 100, marginBottom: 10 },
  nombre: { fontSize: 18, marginBottom: 20 },
  botones: { flexDirection: 'row', gap: 10, justifyContent: 'space-around', width: '100%' },
  resultado: { fontSize: 20, textAlign: 'center', marginVertical: 10 },
});
