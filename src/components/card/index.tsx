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
				<div className={`card-header ${props.headerClass ?? ''}`}>
					<h3 className="card-title">
						{props.title}
					</h3>
					{props.actions && (
						<div className='card-actions'>
							{props.actions}
						</div>
					)}
				</div>
			}
			<div className="card-body">
				{props.children}
			</div>
		</div>
	)
}