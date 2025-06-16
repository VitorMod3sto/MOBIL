

import { NavigationContainer } from '@react-navigation/native';
import { CacheProvider } from './src/contexts/CacheContext';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import TabRoutes from './src/routes/TabRoutes';
import DrawerRoutes from './src/routes/DrawerRoutes';




export default function App() {
  return (
   <PaperProvider>
    <CacheProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
      </CacheProvider>
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
