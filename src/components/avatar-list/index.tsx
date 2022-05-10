import React from 'react';

type Props = {
	stacked?: boolean
	children: React.ReactNode
}

export function AvatarList(props: Props){
	return (
		<div className={`avatar-list ${props.stacked ? 'avatar-list-stacked' : ''}`}>
			{props.children}
		</div>
	)
}