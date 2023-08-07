import { HelmetProvider } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { darkState } from './atoms';
import Router from './Router';
import { GlobalStyle } from './styles/globalStyle';
import { darkTheme, lightTheme } from './styles/theme';

const App = () => {
  const isdark = useRecoilValue(darkState);

  return (
    <>
      <ThemeProvider theme={isdark ? darkTheme : lightTheme}>
        <HelmetProvider>
          <GlobalStyle />
          <Router />
        </HelmetProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
