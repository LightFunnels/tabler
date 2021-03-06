import React from 'react';

type Props = {
	title: string
	subtitle: string
	icon?: React.ReactNode
	header?: React.ReactNode
	actions?: React.ReactNode
}

export function EmptyState(props: Props){
	return (
		<div className='empty'>
			{	
				props.header && (
					<div className='empty-header'>
						{props.header}
					</div>
				)
			}
			{
				props.icon && props.icon
			}
			
			<p className='empty-title'>{props.title}</p>
			<p className='empty-subtitle text-muted'>{props.subtitle}</p>
			<div className='empty-actions pt-3'>
				{props.actions}
			</div>
		</div>
	)
}