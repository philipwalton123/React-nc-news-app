import { useContext, useEffect } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import Articles from "./Articles";
import Header from "./Header";
import NavBar from "./NavBar";
import TopArticle from "./TopArticle";


export default function Home() {

    return <div className="home-wrapper">
        <Header />
        <NavBar />
        <section className="viewport">
            <TopArticle />
            <Articles /> 
        </section>
    </div>
}