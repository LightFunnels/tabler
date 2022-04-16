import {createRoot} from "react-dom/client"
import React from "react";
import {Button, Alert, Link, Input, Label} from "./components"

createRoot(window.app)
  .render(<App />);


function App(){
  const [state, setState] = React.useState('')
	return (
  <div className='p-3'>
    <Alert 
      className="alert-info" 
      title='Wow! Everything worked!'
      children="Your account has been saved! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,"
      default
      // dismissible
      buttons
      avatar="https://avatars.githubusercontent.com/u/60047489?v=4"
      // icon='alert-circle'
      // linkChildren={
      //   <div>This is a success alert — <Link to='#' children='check it out' />!</div>
      // }
    />
    <Link to='#' children='Hello' /> 
    <Button className='mb-2 mt-2' fullWidth onClick={() => {}} primary children='Test Button' />
    <Label children="Enter your Name"/>
    <Input className="mb-2" value={state} onChange={(e) => setState(e.target.value)} placeholder="enter your name" />
  </div>
  )
}