import React from 'react';

type Props = {
	className?: string
	title?: React.ReactNode
	children: React.ReactNode
	actions?: React.ReactNode
}
//actions 
export function Card(props: Props){
	return (
		<div className={`card ${props.className}`}>
			{
				props.actions && (
					<div className={`card-header ${props.actions ? 'd-flex align-items-center justify-content-between' : ''} ${!props.title ? 'text-end' : ''}`}>
						<h3 className="card-title">
							{props.title}
						</h3>
						{props.actions}
					</div>
				)
			}
			<div className="card-body">
				{props.children}
			</div>
		</div>
	)
}