

import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import TabRoutes from './src/routes/TabRoutes';
import DrawerRoutes from './src/routes/DrawerRoutes';




export default function App() {
  return (
   <PaperProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
