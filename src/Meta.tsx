import { Helmet } from "react-helmet-async";
import logo from "./assets/logo_light.png";
import { IMeta } from "./types/meta";

/**
 * @description SEO 처리 컴포넌트
 * @param props title, description, author, url, image
 * @returns {JSX.Element}
 */
const Meta = (props: IMeta) => {
    return (
        <Helmet>
            <meta charSet="UTF-8" />
            <title>{props.title}</title>
            <meta name="content-language" content="ko" />
            <meta name="copyright" content="Copyright © 2023 jsdmas" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={props.description} />
            <meta name="author" content={props.author} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:url" content={props.url} />
            <meta property="og:image" content={props.image} />
            <link rel="icon" type="image/png" href={logo} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&display=swap" rel="stylesheet" />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: "포트폴리오 사이트",
    description: "jsdmas 포트폴리오 사이트입니다.",
    url: window.location.href,
    author: "jsdmas",
    image: null,
    icon: logo
};

export default Meta;