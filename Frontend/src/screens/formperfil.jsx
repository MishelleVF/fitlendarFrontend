import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function FormPerfil(){
    return (
    <View style={styles.container}>
      <Text style={styles.title}>INFORMACIÓN DE LA SALUD</Text>
      <View style={styles.unitSwitchContainer}>
        <TouchableOpacity style={styles.unitButton}>
          <Text style={[styles.unitTextSelected]}>kg, cm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unitButton}>
          <Text style={[styles.unitTextSelected]}>lb, ft</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Altura"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nivel"
      />
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar cambios</Text>
      </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  unitSwitchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  unitButton: {
    marginHorizontal: 10,
  },
  unitText: {
    fontSize: 16,
    color: '#000',
  },
  unitTextSelected: {
    color: '#007BFF',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
