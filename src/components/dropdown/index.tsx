import React from 'react';

type Props = {
	className?: string
	btnClass?:string
	children?: React.ReactNode
	label: string
	header?: string
	arrow?: boolean
	show: boolean
	setShow: (e) => void
}

export function Dropdown(props: Props) {
	return (
		<React.Fragment>
			<div className={`dropdown ${props.className ?? ''}`}>
				<button onClick={() => props.setShow(!props.show)} className={`btn btn-outline justify-content-between dropdown-toggle ${props.btnClass ?? ''}`}>
					{props.label}
				</button>
			</div>
			{props.show && (
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
			)}
		</React.Fragment>
	)
}