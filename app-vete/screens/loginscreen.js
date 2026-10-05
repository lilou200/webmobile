import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Fonction pour la navigation vers l'écran Recherche
  const handleLogin = () => {
    navigation.navigate('Recherche');
  };

  // Fonction pour la navigation vers l'écran CreateAccount
  const goToCreateAccount = () => {
    navigation.navigate('CreateAccount'); 
  };

  // Fonction pour la navigation vers GuestScreen
  const goToGuestScreen = () => {
    navigation.navigate('Guest'); // Navigation vers l'écran GuestScreen
  };

  return (
    <View style={styles.container}>
      {/* Ajout du logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Nom de l'application */}
      <Text style={styles.appName}>VetProximité</Text>

      {/* Champ Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Champ Mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Bouton Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Lien Forgotten Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgotten Password</Text>
      </TouchableOpacity>

      {/* Lien Create an Account */}
      <TouchableOpacity onPress={goToCreateAccount}>
        <Text style={styles.createAccount}>Create an Account</Text>
      </TouchableOpacity>

      {/* Lien login as a guest */}
      <TouchableOpacity onPress={goToGuestScreen}>
        <Text style={styles.createAccount}>Login as a guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00C6AE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#00C6AE',
    marginTop: 10,
    fontSize: 14,
  },
  createAccount: {
    color: '#00C6AE',
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
