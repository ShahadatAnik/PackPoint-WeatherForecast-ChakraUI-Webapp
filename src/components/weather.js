import { useEffect, useState } from 'react';
import { city } from '../city';
import {
  Flex,
  Heading,
  Spacer,
  Stack,
  VStack,
  Container,
  Text,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { WiCelsius, WiFahrenheit } from 'react-icons/wi';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import WeatherInfo from './weatherInfo';
import { Decision } from './Decision';

export default function Weather() {
  const options = city.map(item => {
    return { value: item, label: item };
  });
  const [isCelcius, setIsCelcius] = useState(true);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

  const formateOneDecimal = num => {
    if (isCelcius) return (num - 273.15).toFixed(1);
    return (((num - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  useEffect(() => {
    formateOneDecimal();
  }, [isCelcius]);

  return (
    <Container maxW="container.lg" as="section">
      <Flex alignItems="center" my={2}>
        <VStack spacing={0.5} align="center">
          <Heading
            as="h1"
            size="lg"
            noOfLines={1}
            color="green.500"
            fontWeight="bold"
          >
            PackPoint
          </Heading>
          <Text fontSize="xs" as="b">
            Check Before Pack
          </Text>
        </VStack>
        <Spacer />
        <IconButton
          size="sm"
          as="b"
          variant="ghost"
          fontSize="5xl"
          color="green.500"
          onClick={() => setIsCelcius(!isCelcius)}
          icon={isCelcius ? <WiFahrenheit /> : <WiCelsius />}
        />

        <Spacer />
        <ColorModeSwitcher />
      </Flex>
      <Stack
        Stack
        direction={['column', 'column', 'row']}
        spacing={['3', '3', '6']}
        justify="center"
        mt={2}
      >
        {options && (
          <WeatherInfo
            city={options}
            placeholder={'From'}
            doCelcius={formateOneDecimal}
            infoData={setFrom}
          />
        )}

        {options && (
          <WeatherInfo
            city={options}
            placeholder={'To'}
            doCelcius={formateOneDecimal}
            infoData={setTo}
          />
        )}
      </Stack>
      <Center>
        <Decision from={from} to={to} />
      </Center>
    </Container>
  );
}
