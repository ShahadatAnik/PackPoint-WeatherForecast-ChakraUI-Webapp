import { useEffect, useState } from 'react';
import { city } from '../city';
import {
  Flex,
  Heading,
  Spacer,
  Box,
  HStack,
  Center,
  Stack,
  VStack,
  StackDivider,
  Container,
  useBoolean,
  Switch,
  Text,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { WiCelsius, WiFahrenheit } from 'react-icons/wi';
import { SearchIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Select from 'react-select';

import WeatherInfo from './weatherInfo';

export default function Weather() {
  const options = city.map(item => {
    return { value: item, label: item };
  });
  const [isCelcius, setIsCelcius] = useState(true);
  console.log(isCelcius);
  const formateOneDecimal = num => {
    var n;
    if (isCelcius) {
      n = num - 273.15;
      return n.toFixed(1);
    } else {
      n = ((num - 273.15) * 9) / 5 + 32;
      return n.toFixed(1);
    }
  };

  useEffect(() => {
    formateOneDecimal();
  }, [isCelcius]);

  return (
    <Container as="section">
      <Flex alignItems="center">
        <Heading
          as="h1"
          size="lg"
          noOfLines={1}
          color="green.600"
          fontWeight="bold"
        >
          CheckBeforePack
        </Heading>
        <Spacer />
        <IconButton
          size="sm"
          as="b"
          variant="ghost"
          fontSize="5xl"
          color="green.600"
          onClick={() => setIsCelcius(!isCelcius)}
          icon={isCelcius ? <WiFahrenheit /> : <WiCelsius />}
        />

        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <Stack
        Stack
        direction={['column', 'column', 'row']}
        spacing={['6', '6', '3']}
        justify="center"
        mt="5"
      >
        {options && (
          <WeatherInfo
            city={options}
            placeholder={'From'}
            doCelcius={formateOneDecimal}
          />
        )}

        {options && (
          <WeatherInfo
            city={options}
            placeholder={'To'}
            doCelcius={formateOneDecimal}
          />
        )}
      </Stack>
    </Container>
  );
}
