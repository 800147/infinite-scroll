import { FunctionComponent } from "react";
import MainPage__ from "./MainPage.module.css";
import { Numbers } from "../Numbers/Numbers";

const MainPage: FunctionComponent = () => (
  <main className={MainPage__.Root}>
    <h1>Infinite scroll test 🦄</h1>
    <Numbers />
  </main>
);

export default MainPage;
