import { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Flex,
  SelectList,
  SelectOption,
  SelectInputValue,
  Heading,
  Spacer,
  Box,
  HStack,
  Center,
  Wrap,
  VStack,
  Stack,
  CircularProgress,
  useBoolean,
  Img,
  Image,
  Text,
  Highlight,
  Icon,
} from '@chakra-ui/react';
import { WiHumidity } from 'react-icons/wi';
import { GiMightyForce, GiSunrise, GiSunset } from 'react-icons/gi';
import { MdNaturePeople } from 'react-icons/md';
import { FaArrowUp, FaArrowDown, FaWind } from 'react-icons/fa';
const API = {
  key: '834bb64c903346b8196dbbd32d6ce233',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'green',
    padding: 20,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    backgroundColor: 'white',
    color: state.isFocused ? 'red' : 'green',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  control: _ => ({
    minWidth: '250px',
    width: '100%',
    display: 'flex',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    color: 'green.600',
    backgroundColor: 'white',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '400',
    boxShadow: '0 10px 15px 0 rgba(0, 0, 0, 0.1)',
    '&:hover': {
      borderColor: 'green.600',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    '&:focus': {
      borderColor: 'green.600',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
  }),
};

function Tem({ icon, children, ...rest }) {
  return (
    <HStack {...rest} spacing={2}>
      <Image as={icon} boxSize={['5', '5', '7']} />
      <Text textAlign="left" fontSize={['sm', 'md', 'lg']} as="b">
        <Highlight
          query={children}
          styles={{
            px: '4',
            py: '2',
            rounded: 'full',
            bg: 'green.100',
          }}
        >
          {children}
        </Highlight>
      </Text>
    </HStack>
  );
}

function UnixToTime(unix) {
  var date = new Date(unix * 1000);
  var hours = date.getHours();
  var minutes = '0' + date.getMinutes();
  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

function UnixToDate(unix) {
  var date = new Date(unix * 1000);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}

function WeatherInfo({ city, placeholder, doCelcius }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);

  const fetchData = async query => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API.base}weather?q=${query}&APPID=${API.key}`
      );
      const data = await response.json();
      setWeather(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <Stack direction={['column', 'column', 'column']} spacing={[2, 4, 6]}>
      <Box p={2}>
        <Select
          styles={customStyles}
          options={city}
          placeholder={placeholder}
          closeMenuOnSelect={true}
          onChange={e => setQuery(e.value)}
        />
      </Box>
      <Box p={2}>
        {isLoading && (
          <Center>
            <CircularProgress isIndeterminate color="green.600" />
          </Center>
        )}
        {weather.name && !isLoading && !error && (
          <Box p={5} rounded="md" boxShadow="2xl" alignContent="center">
            <VStack spacing={['2', '2', '4']}>
              <Box>
                <span>
                  <Text
                    as="b"
                    fontSize={['5xl', '5xl', '7xl']}
                    color="green.600"
                    textAlign="center"
                  >
                    {doCelcius(weather.main.temp)}°
                  </Text>
                </span>
              </Box>
              <HStack spacing={3}>
                <Box>
                  <Image
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                </Box>
                <Box>
                  <Text fontSize={['2xl', '1xl', '3xl']} as="b">
                    <Highlight
                      query={weather.weather[0].main}
                      styles={{
                        px: '4',
                        py: '2',
                        rounded: 'full',
                        bg: 'green.100',
                      }}
                    >
                      {weather.weather[0].main}
                    </Highlight>
                  </Text>
                </Box>
              </HStack>

              <HStack spacing={[2, 4, 6]} align="center">
                <Tem icon={FaArrowUp}>
                  {doCelcius(weather.main.temp_min) + '°'}
                </Tem>
                <Tem icon={MdNaturePeople}>
                  {doCelcius(weather.main.feels_like) + '°'}
                </Tem>
                <Tem icon={FaArrowDown}>
                  {doCelcius(weather.main.temp_max) + '°'}
                </Tem>
              </HStack>
              <HStack spacing={[2, 4, 6]} align="center" pt={6}>
                <Tem icon={FaWind}>{weather.wind.speed + 'mph'}</Tem>
                <Tem icon={WiHumidity}>{weather.main.humidity + '%'}</Tem>
                <Tem icon={GiMightyForce}>{weather.main.pressure + 'hPa'}</Tem>
              </HStack>
              <HStack spacing={6} align="center" pt={6}>
                <Tem icon={GiSunrise}>{UnixToTime(weather.sys.sunrise)}</Tem>
                {/* <Tem icon={GiSunrise}>{UnixToDate(weather.dt)}</Tem> */}
                <Tem icon={GiSunset}>{UnixToTime(weather.sys.sunset)}</Tem>
              </HStack>
            </VStack>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

export default WeatherInfo;
