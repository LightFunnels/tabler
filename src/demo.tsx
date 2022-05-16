import "@tabler/core/src/scss/tabler.scss"

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
	Toast,
	EmptyState,
	Modal,
	StaticPopover,
	usePopover,
	Tabs,
	AvatarList
} from "./components";

createRoot(window.app)
	.render(<App />);

function App(){
	const [state, setState] = React.useState('');
	const [checked, setChecked] = React.useState(false);
	const [radio, setRadio] = React.useState('');
	const [toast, toggleToast] = React.useState(false);
	const [showModal, setShowModal] = React.useState(false);
	const [show, setShow] = React.useState<'home' | 'profile' | 'contact'>('home');

	const target = React.useRef<HTMLDivElement>(null);
	const [showTarget, setTarget] = React.useState<boolean>(false);
	
	return (
		<div className='p-3'>
			<Label children="Toast:"/>
			<div className="d-flex mb-2">
				{toast && (
					<Toast 
					dismiss={() => toggleToast(false)} 
					message={
						<React.Fragment>
							<div>this is a toast</div>
						</React.Fragment>
					}
				/>
				)}
				<Button 
					className="ms-2" 
					onClick={() => toggleToast(!toast)} 
					children='toggle'
				/>
			</div>
			<div>
				<Label children="Tooltip:"/>
				{showTarget && (
					<StaticPopover
						placement='right'
						target={target as React.MutableRefObject<HTMLDivElement>}
						children={
							<div>
								Hello
							</div>
						}
					/>
				)}
				<div
					ref={target}
					onMouseOver={e => {
						setTarget(true)
					}}
					onMouseLeave={() => {
						setTarget(false);
					}}
				>
					Hover Me
				</div>
			</div>
			<Label children="Dropdown:"/>
			<Dropdown			
				label='Drop' 
				children={
					<React.Fragment>
						<div className="dropdown-item"><i className="dropdown-item-icon ti ti-settings fs-2"/>Im a dropdown</div>
						<div className="dropdown-item">Im a dropdown</div>
						<div className="dropdown-item">Im a dropdown</div>
					</React.Fragment>
				} 
			/>
			<Label className="mt-2" children="Modal:"/>
			{showModal && (
				<Modal 
					setModalState={setShowModal}
					body={
						<div>
							this is the body...
						</div>
					} 
					title="This is modal" 
					footer={
						<React.Fragment>
							<Button className="me-auto" type="primary" children='Save' />
							<Button children='Cancel' onClick={() => setShowModal(false)} />
						</React.Fragment>
					}
				/>
			)}
			<Button 
				onClick={() => setShowModal(true)} 
				children='Open Modal' 
				className="mb-2" 
				type="primary"
			/>
			<Label className="mt-2" children="Tabs:"/>
			<Tabs
				card
				className="mb-3"
				tabs={
					<React.Fragment>
						<li className="nav-item cursor-pointer">
							<div onClick={() => setShow('home')} className={`nav-link ${show === 'home' ? 'active' : ''}`}>
								<i className="icon me-2 ti ti-home" />
								Home
							</div>
						</li>
						<li className="nav-item cursor-pointer">
							<div onClick={() => setShow('profile')} className={`nav-link ${show === 'profile' ? 'active' : ''}`}>
								<i className="icon me-2 ti ti-propeller" />
								Profile
							</div>
						</li>
						<li className="nav-item cursor-pointer ms-auto">
							<div className="nav-link">
								<i className="icon ti ti-settings" />
							</div>
						</li>
					</React.Fragment>
				}
				body={
					<React.Fragment>
						<div className={`tab-pane ${show === 'home' ? 'active show' : ''}`}>
							<div>Cursus turpis vestibulum, dui in pharetra vulputate id sed non turpis ultricies fringilla at sed facilisis lacus pellentesque purus nibh</div>
						</div>
						<div className={`tab-pane ${show === 'profile' ? 'active show' : ''}`}>
							<div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
						</div>
					</React.Fragment>
				}
			/>
			<Tabs
				className="d-flex"
				tabs={
					<React.Fragment>
						<li className="nav-item cursor-pointer">
							<div onClick={() => setShow('home')} className={`nav-link ${show === 'home' ? 'active' : ''}`}>Home</div>
						</li>
						<li className="nav-item cursor-pointer">
							<div onClick={() => setShow('profile')} className={`nav-link ${show === 'profile' ? 'active' : ''}`}>Profile</div>
						</li>
						<li className="nav-item cursor-pointer">
							<div onClick={() => setShow('contact')} className={`nav-link ${show === 'contact' ? 'active' : ''}`}>Contact</div>
						</li>
					</React.Fragment>
				}
			/>
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
			<br/>
			<Button 
				className='mb-2' 
				onClick={() => console.log('clicked')} 
				type='primary' 
				children={
					<React.Fragment>
						Im a button with Icon
					</React.Fragment>
				}
				loading
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
				actions={'one'}
				className='mb-3'
				children="Hello I'am a card"
			/>
			<Card
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
			<Divider className="mb-3 mt-1" />
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
				className="w-4 h-4 avatar-rounded" 
				src='https://images.unsplash.com/photo-1650622721875-a923cba9e1b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' 
			/>
			<Avatar 
				className="w-4 h-4 bg-red ms-1" 
				firstName="Ismail"
			/>
			<Label className="mt-2" children="AvatarList:" />
			<AvatarList 
				stacked
				children={
					<React.Fragment>
						<Avatar 
							className="w-4 h-4 bg-red" 
							firstName="ismail"
						/>
						<Avatar 
							className="w-4 h-4" 
							src='https://images.unsplash.com/photo-1650622721875-a923cba9e1b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' 
						/>
						<Avatar 
							className="w-4 h-4 bg-black" 
							firstName="Nouf"
						/>
						<Avatar 
							className="w-4 h-4 bg-yellow" 
							firstName="Mazouni"
						/>
						<Avatar 
							className="w-4 h-4 bg-blue" 
							firstName="Omar"
						/>
					</React.Fragment>
				} 
			/>
			<Label className="mt-2" children="Empty State:"/>
			<EmptyState 
				title='Iam empty' 
				subtitle="please make sure to reload" 
				header='404'
				actions={
					<Button 
						children={
							<React.Fragment>
								<i className="icon ti ti-settings"/>
								Reload
							</React.Fragment>
						}
						type='primary'
					/>
				}
			/>
		</div>
	)
}