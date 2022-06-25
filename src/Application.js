import React, { createContext } from "react";
import Card from "./components/Card/Card";
import "./app.scss";

const App = () => {
 
  
  return (
    <div>
      <Card></Card>
    </div>
  );
};


export default App;
export const UserContext = createContext({});

