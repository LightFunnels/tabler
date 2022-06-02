import React from 'react';

type Props = {
	className?: string
	children: string
}

export function Label(props: Props){
	return (
		<label
			className={`form-label mb-1 ${props.className ?? ""}`}
			children={props.children} 
		/>
	)
}