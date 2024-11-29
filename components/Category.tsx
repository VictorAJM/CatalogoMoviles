import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface CategoryProps {
  name: string;
  year: number;
  current: number;
  total: number;
}

const Category: React.FC<CategoryProps> = ({ name, year, current, total }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text>Year: {year}</Text>
      <Text>{`(${current}/${total})`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Category;
