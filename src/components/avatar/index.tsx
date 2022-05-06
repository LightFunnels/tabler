import React from 'react';

export function Avatar({ className, ...props } : React.ImgHTMLAttributes<HTMLImageElement>){
	return (
			<img
				{...props}
				className={`avatar w-4 h-4 ${className ?? ''}`} 
			/>
		)
}