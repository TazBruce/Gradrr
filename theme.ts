import { extendTheme } from 'native-base';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const colors = {
  primary: {
    50: '#F7F9FC',
    100: '#D6E4FF',
    200: '#ADC8FF',
    300: '#84A9FF',
    400: '#6690FF',
    500: '#3366FF',
    600: '#254EDB',
    700: '#1939B7',
    800: '#102693',
    900: '#091A7A',
  },
};

const theme = extendTheme({ colors, config });

export default theme;
