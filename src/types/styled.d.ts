import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    postColor: string;
    textColor: string;
    buttonColor: string;
    accentColor: string;
  }
}
