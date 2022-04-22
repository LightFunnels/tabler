import React from "react";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	loading?: boolean
	btnType?: "button" | "submit" | "reset" | undefined
	fullWidth?: boolean
	type?: 'primary' | 'danger' | undefined
}

export function Button({className, loading, fullWidth, type, btnType, ...props}: Props){
	return (
		<button
			{...props}
			className={
				`	btn
					${fullWidth ? 'w-full' : ''}
					${loading ? 'btn-loading' : ''} 
					${type === 'primary' ? 'btn-primary' : type === 'danger' ? 'btn-danger' : ''}
					${className ?? ''}
				`
			}
			type={btnType}
		/>
	)
}