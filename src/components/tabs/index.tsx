import React from 'react';
import "./tabs.scss"

type Props = {
	className?: string
	tabs: React.ReactNode
	body?: React.ReactNode
	card?: boolean
}

export function Tabs(props: Props) {
	return (
		<div className={`${props.card ? 'card' : ''} ${props.className ?? ''}`}>
			<ul className="nav tabs">
				{props.tabs}
			</ul>
			{
				props.body && (
					<div className="card-body">
						<div className="tab-content">
							{props.body}
						</div>
					</div>
				)
			}
		</div>
	)
}