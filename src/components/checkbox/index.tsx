import React from 'react';

export function Checkbox({children, className, ...props}: React.InputHTMLAttributes<HTMLInputElement>){
  return (
	<label 
		className={`form-check ${className ?? ""}`}
		children={(
			<React.Fragment>
				<input {...props} className="form-check-input" type="checkbox" />
				{children && <span children={children} className="form-check-label" />}   
			</React.Fragment>
		)}  
	/>
  )
}