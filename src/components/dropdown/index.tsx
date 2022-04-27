import React, { useState } from 'react';

type Props = {
	className?: string
	btnClass?: string
	children?: React.ReactNode
	label: string
	header?: string
	arrow?: boolean
}

export function Dropdown(props: Props) {
	const [show, setShow] = useState(false);

	return (
		<React.Fragment>
			<div className={`dropdown ${props.className ?? ''}`}>
				<button onClick={() => setShow(!show)} className={`dropdown-btn dropdown-toggle btn btn-outline w-full justify-content-between ${props.btnClass ?? ''}`}>
					{props.label}
				</button>
			</div>
			{
				show && (
					<div className={`dropdown-menu w-full ${show ? "d-block" : ""} ${props.arrow ? 'dropdown-menu-arrow' : ''}`}>
						{
							props.header && (
								<span className="dropdown-header">
									{props.header}
								</span>
							)
						}
						{props.children}
					</div>
				)
			}
		</React.Fragment >
	)
}