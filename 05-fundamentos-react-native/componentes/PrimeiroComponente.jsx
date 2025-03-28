import React from "react";
import { Text, View, StyleSheet } from 'react-native'

export default function PrimeiroComponente() {
return (
    <View>
        <Text style={styles.textoGrande}>Primeiro Componente</Text>
    </View>
)
}

const styles = StyleSheet.create({
    textoGrande: {
        fontSize:40,
        fontWeight: 600
    }
  });