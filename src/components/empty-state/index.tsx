import React from 'react';

type Props = {
	icon?: React.ReactNode
	title: string
	content: string
	actions?: React.ReactNode
}

export function EmptyState(props: Props){
	return (
		<div className="empty">
			{props.icon && <div className="empty-img">{props.icon}</div>}
			<p className="empty-title">{props.title}</p>
			<p className="empty-subtitle text-muted">
				{props.content}
			</p>
			{props.actions && 
				<div className="empty-action">
					{props.actions}
				</div>
			}
		</div>
	)
}