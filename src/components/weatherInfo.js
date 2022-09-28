import { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  SelectContainer,
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
} from '@chakra-ui/react';

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
    display: 'flex',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    color: 'green.700',
    backgroundColor: 'white',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '400',
    boxShadow: '0 10px 15px 0 rgba(0, 0, 0, 0.1)',
    '&:hover': {
      borderColor: 'green.300',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    '&:focus': {
      borderColor: 'green.300',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
  }),
};

function formateOneDecimal(num) {
  var n = num - 273.15;
  return n.toFixed(1);
}

function WeatherInfo({ props }) {
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
    <VStack>
      <Select
        sx={{ border: '1px solid red' }}
        styles={customStyles}
        options={props.city}
        placeholder={props.placeholder}
        closeMenuOnSelect={true}
        onChange={e => setQuery(e.value)}
      />
      <Center m={3}>
        {isLoading && <CircularProgress isIndeterminate color="green.300" />}
        {weather.name && !isLoading && !error && (
          <div>
            City: {weather.name}
            <br />
            Country: {weather.sys.country}
            <br />
            Temp: {formateOneDecimal(weather.main.temp)}
            <br />
            feels_like: {formateOneDecimal(weather.main.feels_like)}
            <br />
            temp_min: {formateOneDecimal(weather.main.temp_min)}
            <br />
            temp_max: {formateOneDecimal(weather.main.temp_max)}
            <br />
            Weather: {weather.weather[0].main}
            <br />
          </div>
        )}
      </Center>
    </VStack>
  );
}

export default WeatherInfo;
