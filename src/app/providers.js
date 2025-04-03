'use client';

import { ChakraProvider, extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react';

// Use `extendBaseTheme` instead of `extendTheme`
const theme = extendBaseTheme(chakraTheme);

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
