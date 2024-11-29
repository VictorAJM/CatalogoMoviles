import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface CarritoProps {
  name: string;
  year: number;
  category: string;
  categoryTotal: number;
  categoryID: number;
  hwID: string;
}


const Carrito: React.FC<CarritoProps> = ({
  name, year, category, categoryTotal, categoryID, hwID
}) => {
  return <View style={styles.card}>
    <Text style={styles.categoryTitle}>{`${category} - ${year}  (${categoryID}/${categoryTotal})`}</Text>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.hwText}>{hwID}</Text>
  </View>;
}
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
  categoryTitle: {
    fontSize: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hwText: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Carrito;