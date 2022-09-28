import React from 'react';
import {
  ChakraProvider,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
} from '@chakra-ui/react';
import Weather from './components/weather';
function App() {
  return (
    <ChakraProvider>
      <Weather />
    </ChakraProvider>
  );
}

export default App;
