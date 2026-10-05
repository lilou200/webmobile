import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const GuestScreen = () => {
  const [locality, setLocality] = useState('');
  const [vetResults, setVetResults] = useState([
    { name: 'Robert Fox', phone: '(406) 555-0120' },
    { name: 'Dianne Russell', phone: '(229) 555-0519' },
    { name: 'Cameron Williamson', phone: '(704) 555-0127' },
    { name: 'Ralph Edwards', phone: '(225) 555-0118' },
    { name: 'Wade Warren', phone: '(208) 555-0112' },
  ]);

  const handleSearch = () => {
    // Logique de recherche (par exemple, filtrer selon la localité)
    console.log('Recherche pour la localité:', locality);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search veterinarian by locality</Text>

      {/* Champ de recherche par localité */}
      <TextInput
        style={styles.input}
        placeholder="Search by Locality"
        value={locality}
        onChangeText={setLocality}
      />

      {/* Bouton de recherche */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Résultats de la recherche */}
      <View style={styles.resultsContainer}>
        {vetResults.map((vet, index) => (
          <TouchableOpacity key={index} style={styles.resultItem}>
            <Text style={styles.resultText}>{vet.name}</Text>
            <Text style={styles.resultText}>{vet.phone}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#00C6AE',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
  },
});

export default GuestScreen;
