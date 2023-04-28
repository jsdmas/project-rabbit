import Router from "./Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { darkState } from "./atoms";
import { HelmetProvider } from "react-helmet-async"

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	font-family: 'Gothic A1', sans-serif;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	background-color: ${props => props.theme.bgColor};
	line-height: 1;
	
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
	text-decoration: none;
	&:link, &:visited,&:active {
		color: ${props => props.theme.accentColor};
	}
	&:hover{
		color: ${props => props.theme.buttonColor};
		transition: 0.2s ;
	}
}

`;

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