import React from 'react';

export function TextArea({className, ...props}: React.TextareaHTMLAttributes<Element>){
	return (
		<div className={className}>
			<textarea 
				{...props}
				className={`form-control`} 
			/>
		</div>
	)
}