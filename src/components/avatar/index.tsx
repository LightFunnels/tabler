import React from 'react';

type Props = {
	firstName?: string
}

export function Avatar({ firstName, className, ...props } : Props & React.ImgHTMLAttributes<HTMLImageElement>){
	const name = firstName ? firstName.slice(0,2) : null

	return firstName ? (
			<span className={`avatar text-uppercase ${className ?? ''}`}>{name}</span>
		) : (
			<img
				{...props}
				className={`avatar w-4 h-4 object-cover ${className ?? ''}`} 
			/>
		)
}
	