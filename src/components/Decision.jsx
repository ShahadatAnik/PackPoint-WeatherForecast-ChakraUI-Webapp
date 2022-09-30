import { Text, Highlight, Stack, StackDivider } from '@chakra-ui/react';

function CityWeather({ name, country, desc }) {
  return (
    <Text
      textAlign="center"
      fontSize={['lg', 'xl', '2xl']}
      css={{ textTransform: 'capitalize' }}
      color="green.500"
      as={'b'}
    >
      {name},{country}
      <br />
      <Highlight
        query={desc}
        styles={{
          px: '2',
          rounded: 'full',
          bg: 'green.100',
        }}
      >
        {desc}
      </Highlight>
    </Text>
  );
}

export function Decision({ from, to, ...rest }) {
  const whatNeeded = {
    Clear: ['Sunglasses', 'Sunscreen'],
    Clouds: ['Umbrella', 'Raincoat'],

    Thunderstorm: [
      'Umbrella',
      'Raincoat',
      'Jacket',
      'Boots',
      'Gloves',
      'Hat',
      'Socks',
      'Storm survival kit',
      'Dry foods',
      'Medical kit',
    ],
    Rain: [
      'Umbrella',
      'Raincoat',
      'Jacket',
      'Boots',
      'Gloves',
      'Hat',
      'Socks',
      'Rubber boots',
      'Insect repellent ',
    ],
    Snow: [
      'Jacket',
      'Boots',
      'Gloves',
      'Hat',
      'Socks',
      'Shovel',
      'Socks',
      'Flashlight',
      'Dry snacks',
      'Coats',
    ],
    Drizzle: [
      'Umbrella',
      'Raincoat',
      'Jacket',
      'Boots',
      'Gloves',
      'Hat',
      'Socks',
      'First aid kit',
      'Torch light',
    ],

    Haze: [
      'N95 mask',
      'Portable air purifier',
      'Avoid smoking',
      'Wear respirator',
    ],
    Mist: [
      'Get vehicle checked',
      'Emergency kit',
      'Avoid smoking',
      'Drive slow',
      'Keep safe distance',
    ],
    Fog: [
      'Drive safe',
      'Flashlight',
      'Umbrella',
      'Keep windows clear',
      'Turn on the headlight always',
    ],

    Smoke: [
      'Use fire safe cigarettes',
      'Install fire protection system',
      'Cool a burn',
      'Stop,drop & roll',
    ],
    Dust: ['Mask', 'Sanitizer', 'Insect repellent', 'Wear goggles'],

    Sand: ['Mask', 'Portable air purifier', 'Water'],
    Ash: [
      'Safety kits',
      'Seek shelter indoors',
      'Wear Long sleeve shirt and pants',
      'Mask on',
      'Goggles',
      'Keep car engine off while driving',
    ],

    Squall: [
      'Shovel',
      'Gloves',
      'Coats',
      'Caps',
      'Boots',
      'Water',
      'Portable charger',
    ],
    Tornado: [
      'Raincoat',
      'Monitor storm alert',
      'Avoid overpass',
      'Dry foods',
      'Emergency kit',
      'Portable charger',
      'Prescription medication',
      'Cash',
    ],
  };

  const needed = (conditionFrom, conditionTo) => {
    const array3 = [
      ...new Set([...whatNeeded[conditionFrom], ...whatNeeded[conditionTo]]),
    ];
    return array3;
  };

  return (
    <>
      {from?.name && to?.name && (
        <Stack
          {...rest}
          spacing={4}
          p={4}
          direction={['column', 'column', 'row']}
          alignItems={['center', 'center', 'center']}
          divider={<StackDivider borderColor="green.500" />}
        >
          <CityWeather
            name={from.name}
            country={from.sys.country}
            desc={from.weather[0].description}
          />
          <CityWeather
            name={to.name}
            country={to.sys.country}
            desc={to.weather[0].description}
          />
          <Text
            as={'b'}
            textAlign="center"
            fontSize={['lg', 'xl', '2xl']}
            css={{ textTransform: 'capitalize' }}
            color="green.500"
          >
            You will need <br />
            {needed(from.weather[0].main, to.weather[0].main).map(
              (item, index) => (
                <Highlight
                  key={index}
                  query={item}
                  styles={{
                    px: '2',
                    rounded: 'full',
                    bg: 'green.100',
                  }}
                >
                  {item + ' '}
                </Highlight>
              )
            )}
          </Text>
        </Stack>
      )}
    </>
  );
}
