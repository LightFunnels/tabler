import React from 'react';

type Props = {
	className?: string
	title?: React.ReactNode
	headerClass?: string
	children: React.ReactNode
	actions?: React.ReactNode
}

export function Card(props: Props){
  return (
		<div className={`card ${props.className ?? ''}`}>
			{
				(props.title || props.actions) ? (
					<div className={`card-header ${props.headerClass ?? ''}`}>
						{props.title && (
							<h3 className="card-title">
								{props.title}
							</h3>
						)}
						{props.actions && (
							<div className='card-actions'>
								{props.actions}
							</div>
						)}
					</div>
				)	: null
			}
			<div className="card-body">
				{props.children}
			</div>
		</div>
	)
}