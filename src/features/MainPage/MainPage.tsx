import { FunctionComponent } from "react";
import MainPage__ from "./MainPage.module.css";
import { Numbers } from "../Numbers/Numbers";

const MainPage: FunctionComponent = () => (
  <main className={MainPage__.Root}>
    <h1>Infinite scroll test 🦄</h1>
    <p>This app is made for testing.</p>
    <p>
      Source code:{" "}
      <a href="https://github.com/800147/infinite-scroll" target="_blank">
        https://github.com/800147/infinite-scroll
      </a>
    </p>
    <Numbers />
  </main>
);

export default MainPage;
