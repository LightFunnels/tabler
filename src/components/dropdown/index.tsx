import React from 'react';

type Props = {
  className?: string
  children?: React.ReactNode
  header?: string
  arrow?: boolean
}

export function Dropdown(props: Props){
	return (
		<div className='dropdown'>
			<div className='dropdown-toggle'>
				'Toggle the Dropdown'
			</div>
			<div className={`dropdown-menu dropdown-menu-demo ${props.arrow ? 'dropdown-menu-arrow' : ''} ${props.className ?? ''}`}>
				{
					props.header && (
						<span className="dropdown-header">
							{props.header}
						</span>
					)
				}
				<div className='dropdown-item'>
					{props.children}
				</div>
			</div>
		</div>
	)
}