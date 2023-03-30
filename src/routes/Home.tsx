import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api";

const Home = () => {
    const { isLoading, data } = useQuery(["test"], fetchData);
    console.log(data);
    return (
        <>
            Home ~
        </>
    );
};

export default Home;