import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryDetailsScreen = ({ route }) => {
  const { name, year, current, total } = route.params; // Extraer los parámetros

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Year: {year}</Text>
      <Text>{`Current: ${current}`}</Text>
      <Text>{`Total: ${total}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CategoryDetailsScreen;
