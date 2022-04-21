import React from 'react';

type Props = {
	className?: string
	children?: React.ReactNode
	header?: string
	arrow?: boolean
}

export function Dropdown(props: Props) {
	return (
		<div className='dropdown'>
			<button className=' btn btn-outline justify-content-between dropdown-toggle' type='button' data-bs-toggle="dropdown">
				'Toggle the Dropdown'
			</button>
			<div className={`dropdown-menu ${props.arrow ? 'dropdown-menu-arrow' : ''} ${props.className ?? ''}`}>
				{
					props.header && (
						<span className="dropdown-header">
							{props.header}
						</span>
					)
				}
				{props.children}
			</div>
		</div>
	)
}