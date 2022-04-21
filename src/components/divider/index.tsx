import React from 'react';

type Props = {
	position?: "left" | "right" | undefined 
	className?: string 
	children: string
}

export function Divider(props: Props){
	return (
		<div 
			className={
				`
					hr-text
					${props.position === 'left' ? 'hr-text-left' : props.position === 'right' ? 'hr-text-right' : ''} 
					${props.className ?? ''}
				`
			} 
			children={props.children}
		/>
	)
}