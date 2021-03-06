import React from 'react';
import {Link as RDLink} from 'react-router-dom';

type Props = {
	native: boolean
	to: string
}

export function Link({className, native, to, ...props}: Props & React.AnchorHTMLAttributes<HTMLAnchorElement>){
	return (
		!native ? (
			<RDLink 
				{...props}
				to={to}
				className={`alert-link ${className ?? ''}`} 
			/>
		) : (
			<a 
				{...props}
				href={to}
				className={`alert-link ${className ?? ''}`}
			/>
		)
	)
}