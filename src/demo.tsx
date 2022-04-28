import {createRoot} from "react-dom/client";
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
	Spinner,
	Avatar,
	PageHeader,
	Toast
} from "./components";

createRoot(window.app)
	.render(<App />);


function App(){
	const [state, setState] = React.useState('');
	const [checked, setChecked] = React.useState(false);
	const [radio, setRadio] = React.useState('');
	const [toast, toggleToast] = React.useState(false);
	return (
		<div className='p-3'>
			<Label children="Toast:"/>
			<div className="d-flex mb-2">
				<Toast 
					show={toast} 
					dismiss={() => toggleToast(false)} 
					message={
						<>
							<div>this is a toast</div>
						</>
					}
				/>
				<Button 
					className="ms-2" 
					onClick={() => toggleToast(!toast)} 
					children='toggle'
				/>
			</div>
			<Label children="Dropdown:"/>
			<Dropdown 
				label='Drop' 
				children={
					<div className="dropdown-item">Im a dropdown</div>
				} 
			/>
			{/* <Example2 /> */}
			<Label className="mt-3" children="Page Header:" />
			<PageHeader 
				title='This is a title' 
				subHeader='this is a subheader' 
				breadcrumbs={
					<React.Fragment>
							<li className="breadcrumb-item"><a href="#">Home</a></li>
							<li className="breadcrumb-item"><a href="#">Library</a></li>
							<li className="breadcrumb-item active"><a href="#">Data</a></li>
					</React.Fragment>
				}
				actions={
					<React.Fragment>
						<a href="#" className="btn btn-white me-2">
							New view
						</a>
						<a href="#" className="btn btn-white">
							New view
						</a>
					</React.Fragment>
				}
			/>
			<Label className="mt-3" children="Alert:" />
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
			<Label children="Link:" />
			<Link native to='/' children='Im a link' />
			<br/>
			<Label className="mt-2" children="Buttons:" />
			<Button 
				className='mb-2' 
				onClick={() => console.log('clicked')} 
				type='danger' 
				children='Danger Button'
			/>
			<br/>
			<Button 
				className='mb-2' 
				onClick={() => console.log('clicked')} 
				type='primary' 
				children={
					<React.Fragment>
						<i className="icon ti ti-3d-cube-sphere"/>
						Im a button with Icon
					</React.Fragment>
				}
			/>
			<Label children="Inputs:" />
			<Input 
				className="mb-2" 
				value={state} 
				onChange={(e) => setState(e.target.value)} 
				placeholder="Normal input" 
			/>
			<Input 
				className="mb-2" 
				value={state} 
				onChange={(e) => setState(e.target.value)} 
				placeholder="Loading input" 
				loading 
			/>
			<Input 
				className="mb-2"
				placeholder="Input with icon"
				rightIcon={
					<React.Fragment>
						<i className="ti ti-adjustments-horizontal" />
						<i className="ti ti-adjustments-horizontal" />
					</React.Fragment>
				}
				leftIcon={
					<i className="ti ti-adjustments-horizontal" />
				}
			/>
			<Label children="Select:" />
			<Select 
				className="mb-3" 
				options={
					[
						{label:'one', value: 'd'},
						{label: 'two', value: 's'}
					]
				}
			/>
			<Label children="Switch:" />
			<Switch 
				children='Switch Element' 
				checked={checked} 
				onChange={(e) => setChecked(e.target.checked)}
			/>
			<Switch 
				className="px-0 mb-2"
				checked={checked} 
				onChange={(e) => setChecked(e.target.checked)}
			/>
			<Label children="Checkbox:" />
			<Checkbox 
				children='Checkbox'
				checked={checked}  
				onChange={(e) => setChecked(e.target.checked)}
			/>
			<div> 
				<Label className="mb-2" children='Radios:' />
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
			<Label children="Card:" />
			<Card
				// title='Title Card'
				actions={'one'}
				className='mb-3'
				children="Hello I'am a card"
			/>
			<Label children="Text Area:" />
			<TextArea 
				placeholder="This is a text area"
				className="mb-2"
			/>
			<Label children="Divider:" />
			<Divider className="mb-3 mt-1" children="im a divider" />
			<Label children="Spinner:" />
			<Spinner className="mb-2" />
			<br/>
			<Label children="Avatars:" />
			<Avatar 
				className="w-4 h-4" 
				src='https://logos-world.net/wp-content/uploads/2021/08/Akatsuki-Logo.png' 
			/>
			<Avatar 
				className="w-4 h-4 mx-1" 
				src='https://images.unsplash.com/photo-1648737119247-e93f56878edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80' 
			/>
			<Avatar 
				className="w-4 h-4" 
				src='https://images.unsplash.com/photo-1650622721875-a923cba9e1b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' 
			/>
		</div>
	)
}