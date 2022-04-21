import {createRoot} from "react-dom/client"
import React from "react";
import {
	Button, 
	Alert, 
	Link, 
	Input, 
	Label, 
	Select, 
	Switch, 
	Radio, 
	Checkbox, 
	Card, 
	TextArea, 
	Dropdown, 
	Divider,
	Spinner
} from "./components"

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
				children={(
					<React.Fragment>
						<h4 className="alert-title">
							Wow! Everything worked!
						</h4>
						<div className="text-muted">
							Your account has been saved!
						</div>
					</React.Fragment>
				)}
				avatar="https://avatars.githubusercontent.com/u/60047489?v=4"
				// dismissible
				// icon='alert-circle'
				// linkChildren={
				//   <div>This is a success alert — <Link to='#' children='check it out' />!</div>
				// }
				//background='alert-important alert-danger'
			/>
			<Link native to='/' children='Im a link' />
			<Button 
				className='mb-2 mt-2' 
				fullWidth 
				onClick={() => console.log('clicked')} 
				type='primary' 
				children='Test Button' 
			/>
			<Label children="Enter your Name" />
			<Input loading className="mb-2" value={state} onChange={(e) => setState(e.target.value)} placeholder="enter your name" />
			<Label children="Select" />
			<Select 
				className="mb-3" 
				options={
					[
						{label:'one', value: 'd'},
						{label: 'two', value: 's'}
					]
				}
			/>
			<Switch 
				children='Switch' 
				checked={checked} 
				onChange={(e) => setChecked(e.target.checked)}
			/>
			<Switch 
				checked={checked} 
				onChange={(e) => setChecked(e.target.checked)}
			/>
			<Checkbox 
				children='Checkbox'
				checked={checked}  
				onChange={(e) => setChecked(e.target.checked)}
			/>
			<div> 
				<Label className="mb-2" children='Radios' />
				<Radio 
					children='Radio'
					checked={radio === 'one'}  
					onChange={() => {setRadio('one')}}
				/>
				<Radio 
					children='Radio'  
					checked={radio === 'two'}  
					onChange={() => {setRadio('two')}}
				/>
				<Radio
					children='Radio'
					checked={radio === 'three'}  
					onChange={() => {setRadio('three')}}
				/>
			</div>
			<Card
				// title='Title Card'
				actions={'one'}
				className='mb-3'
				children="Hello I'am a card"
			/>
			<TextArea 
				value='im a text area'
				className="mb-2"
			/>
			<Dropdown 
				label='Toggle'
				children={
					<React.Fragment>
						<div className="dropdown-item">Item1</div>
						<div className="dropdown-item">Item1</div>
						<div className="dropdown-item">Item1</div>
					</React.Fragment>
				}
			/>
			<Divider className="mb-3" children="im a divider" />
			<Spinner />
		</div>
	)
}