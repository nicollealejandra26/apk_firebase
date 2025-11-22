import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Home from './componentes/Home';
import Original from './componentes/Original';
import Perfil from './componentes/Perfil';
import Logout from './componentes/Logout';

const Tab = createBottomTabNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return unsubscribe;
  }, []);

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00b5cc" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Juego" component={Original} />
            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="Salir" component={Logout} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Registro" component={Registro} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
});