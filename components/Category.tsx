import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, GestureResponderEvent  } from 'react-native';

interface CategoryProps {
  name: string;
  year: number;
  current: number;
  total: number;
  onPress: () => void; 
}

const Category: React.FC<CategoryProps> = ({ name, year, current, total, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.view}>
        <Text style={styles.title}>{name}</Text>
        <Text>Year: {year}</Text>
        <Text>{`(${current}/${total})`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
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
