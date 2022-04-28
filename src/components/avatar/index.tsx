import React from 'react';

type Props = {
	className?: string
	src: string
	alt?: string
}
 
export function Avatar(props : Props){
	return (
			<img
				className={`avatar w-4 h-4 ${props.className ?? ''}`} 
				src={props.src}
				alt={props.alt}
			/>
		)
}