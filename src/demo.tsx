import {createRoot} from "react-dom/client"
import React from "react";
import {Button, Alert, Link, Input, Label, Select, Switch, Radio, Checkbox} from "./components"

createRoot(window.app)
  .render(<App />);


function App(){
  const [state, setState] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [radio, setRadio] = React.useState('')
	return (
  <div className='p-3'>
    <Alert 
      className="alert-info" 
      title='Wow! Everything worked!'
      children="Your account has been saved! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,"
      // default
      dismissible
      // buttons
      // avatar="https://avatars.githubusercontent.com/u/60047489?v=4"
      icon='alert-circle'
      // linkChildren={
      //   <div>This is a success alert — <Link to='#' children='check it out' />!</div>
      // }
      // background='alert-important alert-danger'
    />
    <Link native to='/' children='Hello' /> 
    <Button className='mb-2 mt-2' fullWidth onClick={() => {}} type='primary' children='Test Button' />
    <Label children="Enter your Name"/>
    <Input loading className="mb-2" value={state} onChange={(e) => setState(e.target.value)} placeholder="enter your name" />
    <Select className="mb-3" options={['one', 'two', 'three']} label='Select' />
    <Switch 
      checked={checked} 
      label='Switch' 
      content='Switch itt up!'
      onChange={(e) => setChecked(e.target.checked)}
    />
    <div> 
      <Label className="mb-2" children='Radios'/>
      <Radio 
        checkboxLabel='Radio'
        checked={radio === 'one'}  
        onChange={() => {setRadio('one')}}
        content='Radio itt1 up!'
      />
      <Radio 
        checkboxLabel='Radio'  
        checked={radio === 'two'}  
        onChange={() => {setRadio('two')}}
        content='Radio itt2 up!'
      />
      <Radio
        
        checkboxLabel='Radio'
        checked={radio === 'three'}  
        onChange={() => {setRadio('three')}
        }
        content='Radio itt3 up!'
      />
    </div>
    <Checkbox 
      label='Hit Checkbox' 
      checkboxLabel='Checkbox'
      checked={checked}  
      onChange={(e) => setChecked(e.target.checked)}
      content='Checkbox itt up!'
    />
  </div>
  )
}