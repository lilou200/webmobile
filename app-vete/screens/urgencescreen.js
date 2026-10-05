import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Picker, Button, Animated } from 'react-native';
import MapComponent from '../components/MapComponent';  // Importer le composant de la carte
import { useNavigation } from '@react-navigation/native'; // Importer le hook de navigation
import { Ionicons } from '@expo/vector-icons';  // Importer des icônes (vous pouvez utiliser une autre bibliothèque)
import { Image } from 'react-native';

const RechercheScreen = () => {
  const [showList, setShowList] = useState(false); // Toggle entre carte et liste
  const [showSearchMenu, setShowSearchMenu] = useState(false); // Afficher ou masquer le menu de recherche
  const [category, setCategory] = useState('');  // Catégorie sélectionnée
  const [location, setLocation] = useState('');  // Localisation sélectionnée
  const navigation = useNavigation();

  // Animation de la hauteur du menu
  const menuHeight = useState(new Animated.Value(0))[0];  // Initialement 0, ce qui signifie que le menu est caché.

  // Exemple de données des vétérinaires
  const veterinarians = [
    { id: '1', name: 'Valentin Peter', distance: '12 km', specialty: 'Vétérinaire de garde', address: 'Rue de l\'italand, 45, Namur' },
    { id: '2', name: 'Eleanor Pena', distance: '18 km', specialty: 'Vétérinaire', address: 'Rue de l\'italand, 45, Namur' },
    { id: '3', name: 'Esther Howard', distance: '20 km', specialty: 'Vétérinaire', address: 'Rue de l\'italand, 45, Namur' },
  ];

  // Fonction de navigation vers Emergency
  const goToEmergency = () => {
    navigation.navigate('Urgence');
  };

  // Fonction de navigation vers Search
  const goToSearch = () => {
    navigation.navigate('Search');
  };

  // Fonction de navigation vers Profile
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  // Fonction pour animer l'ouverture/fermeture du menu
  const toggleSearchMenu = () => {
    if (showSearchMenu) {
      // Fermer le menu (réduire la hauteur à 0)
      Animated.spring(menuHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      // Ouvrir le menu (augmenter la hauteur)
      Animated.spring(menuHeight, {
        toValue: 250,  // La hauteur que le menu atteindra
        useNativeDriver: false,
      }).start();
    }
    setShowSearchMenu(!showSearchMenu);
  };

  return (
    <View style={styles.container}>
      {/* En-tête avec le logo à gauche et les boutons pour basculer entre la carte et la liste */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}  // Remplacez ceci par le chemin réel de votre logo
          style={styles.logo}
        />
        <TouchableOpacity onPress={toggleSearchMenu}>
          <Ionicons name="search" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowList(!showList)}>
          <Ionicons name={showList ? "map" : "list"} size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Menu de recherche dépliant animé */}
      <Animated.View style={[styles.searchMenu, { height: menuHeight, display: showSearchMenu ? 'flex' : 'none' }]}>
        <Text style={styles.label}>Catégorie</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Animaux domestiques habituels" value="domestic_animals" />
          <Picker.Item label="Autre Canidé" value="other_canid" />
          <Picker.Item label="Autre Félidé" value="other_feline" />
          <Picker.Item label="Lagomorphe" value="lagomorph" />
          <Picker.Item label="Oiseau" value="bird" />
          <Picker.Item label="Poisson" value="fish" />
          <Picker.Item label="Equidés" value="equids" />
          <Picker.Item label="Rongeur" value="rodent" />
          <Picker.Item label="Ophidien" value="ophiidian" />
          <Picker.Item label="Saurien" value="saurian" />
          <Picker.Item label="Amphibien" value="amphibian" />
          <Picker.Item label="Arachnide" value="arachnid" />
        </Picker>

        <Text style={styles.label}>Localisation</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Adresse"
          style={styles.input}
        />
        <Button title="Rechercher" onPress={() => {}} />
      </Animated.View>

      {/* Basculer entre la carte et la liste */}
      {showList ? (
        <FlatList
          data={veterinarians}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.veterinarianName}>{item.name}</Text>
              <Text>{item.specialty}</Text>
              <Text>{item.distance}</Text>
              <Text>{item.address}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}  // Assurez-vous que chaque élément a une clé unique
        />
      ) : (
        <MapComponent />
      )}

      {/* Footer avec les autres boutons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={goToEmergency}>
          <Text style={styles.footerButtonText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={goToSearch}>
          <Text style={styles.footerButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={goToProfile}>
          <Text style={styles.footerButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Espacer le logo et les icônes
    alignItems: 'center',
    backgroundColor: '#00C6AE',
    padding: 10,
  },
  logo: {
    width: 40,  // Ajustez la taille du logo selon vos besoins
    height: 40, // Ajustez la taille du logo selon vos besoins
    resizeMode: 'contain',
  },
  searchMenu: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#00C6AE',
  },
  footerButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    width: '28%',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#00C6AE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  veterinarianName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});
  
export default RechercheScreen;
