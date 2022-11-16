import type { NextPage } from "next";
import Page from "../components/page";
import Signin from "../components/signIn";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Page>
      <Signin />
    </Page>
  );
};

export default Home;
