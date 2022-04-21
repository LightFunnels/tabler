import React from 'react';

type Props = {
	className?: string
	children?: React.ReactNode
	label: string
	header?: string
	arrow?: boolean
}

export function Dropdown(props: Props) {
	return (
		<div className={`dropdown ${props.className ?? ''}`}>
			<button className='btn btn-outline justify-content-between dropdown-toggle' data-bs-auto-close="outside" type='button' data-bs-toggle="dropdown">
				{props.label}
			</button>
			<div className={`dropdown-menu ${props.arrow ? 'dropdown-menu-arrow' : ''}`}>
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