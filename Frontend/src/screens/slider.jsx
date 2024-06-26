import React, { useState } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

const CustomSlider = ({ title, labels }) => {
  const [value, setValue] = useState(50); // Valor inicial en 50

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={25} // Valores incrementales en 25
        value={value}
        onValueChange={(val) => setValue(val)}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#000000"
      />
      <View style={styles.labelContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.label}>{label}</Text>
        ))}
      </View>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.appContainer}>
      <CustomSlider
        title="¿Cuánto tiempo quieres disponer para tus rutinas?"
        labels={["Cumplir nomás.", "", "", "", "Aprovechar al máximo"]}
      />
      <CustomSlider
        title="Mis rutinas serán..."
        labels={["Relajadas", "", "Moderadas", "", "Exigentes"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    width: 50, // Ajusta según sea necesario
  },
});

export default App;
