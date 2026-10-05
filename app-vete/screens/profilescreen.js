import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  // État pour l'email, le nom d'utilisateur, les mots de passe
  const [email, setEmail] = useState('emilie.dupond@gmail.be');
  const [username, setUsername] = useState('EmilieD');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Logique pour réinitialiser le mot de passe
    console.log('Réinitialiser le mot de passe');
  };

  const handleSaveChanges = () => {
    // Logique pour enregistrer les modifications du profil
    console.log('Enregistrer les modifications');
  };

  const handleDeleteAccount = () => {
    // Logique pour supprimer le compte
    console.log('Supprimer le compte');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Email et nom d'utilisateur */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Réinitialisation du mot de passe */}
      <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
        <Text style={styles.resetPasswordText}>Reset password</Text>
      </TouchableOpacity>

      {/* Champs de mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Password confirmation"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Boutons d'actions */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Change</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete account</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  resetPasswordButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  resetPasswordText: {
    fontSize: 16,
    color: '#00C6AE',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#00C6AE',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
