import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginscreen'; // Importer l'écran de connexion
import RechercheScreen from './screens/recherchescreen';  // Importer l'écran Recherche
import UrgenceScreen from './screens/urgencescreen';    // Importer l'écran Urgence
import ProfileScreen from './screens/profilescreen';    // Importer l'écran Profil
import CreateAccountScreen from './screens/createscreen'; // Importer l'écran de création de compte
import GuestScreen from './screens/guestscreen';  // Importer l'écran d'utilisation sans compte

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Écran Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        {/* Écran Recherche */}
        <Stack.Screen
          name="Recherche"
          component={RechercheScreen}
          options={{ headerShown: false }}
        />
        {/* Écran Urgence */}
        <Stack.Screen
          name="Urgence"
          component={UrgenceScreen}
          options={{ headerShown: false }}
        />
        {/* Écran Profil */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ headerShown: false  }}
        />
        <Stack.Screen
          name="Guest"
          component={GuestScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
