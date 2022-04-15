import {createRoot} from "react-dom/client"
import React from "react";
import {Button} from "./components"

createRoot(window.app)
  .render(<App />);


function App(){
	return <Button />
}