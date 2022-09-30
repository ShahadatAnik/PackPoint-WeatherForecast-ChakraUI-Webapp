import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Weather from './components/weather';
function App() {
  return (
    <ChakraProvider>
      <Weather />
    </ChakraProvider>
  );
}

export default App;
