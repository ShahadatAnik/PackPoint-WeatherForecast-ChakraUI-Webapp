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
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Select from 'react-select';

import WeatherInfo from './weatherInfo';

export default function Weather() {
  const options = city.map(item => {
    return { value: item, label: item };
  });

  return (
    <Container as="section">
      <Flex alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">What to Take?</Heading>
        </Box>
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <Stack
        Stack
        direction={['column', 'column', 'row']}
        spacing={['6', '6', '5']}
        divider={<StackDivider borderColor="gray.200" />}
        justify="center"
        mt="5"
      >
        {options && (
          <WeatherInfo props={{ city: options, placeholder: 'From' }} />
        )}

        {options && (
          <WeatherInfo props={{ city: options, placeholder: 'To' }} />
        )}
      </Stack>
    </Container>
  );
}
