import React from 'react';

type Props = {
	className?: string
}

export function Spinner(props: Props){
	return (
		<div className={`spinner-border ${props.className ?? ''}`} />
	)
}