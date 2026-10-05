import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation

const CreateAccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();  // Initialiser la navigation

  const handleCreateAccount = () => {
    // Logique pour créer le compte (par exemple, appeler une API)
    console.log('Créer le compte avec:', email, password);
  };

  // Fonction pour naviguer vers l'écran Login
  const goToLogin = () => {
    navigation.navigate('Login');  // Naviguer vers l'écran Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

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

      {/* Bouton pour créer le compte */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Lien vers l'écran de login */}
      <TouchableOpacity style={styles.linkButton} onPress={goToLogin}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#00C6AE',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#00C6AE',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default CreateAccountScreen;
