import React from "react";

type Props = {
	loading?: boolean
	btnType?: string
	fullWidth?: boolean
}

export function Button({className, loading, fullWidth, type, btnType, ...props}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>){
	return (
		<button
			{...props}
			className={
				`	btn
					${fullWidth ? 'w-full' : ''}
					${loading ? 'btn-loading' : ''} 
					${btnType === 'primary' ? 'btn-primary' : btnType === 'danger' ? 'btn-danger' : ''}
					${className ?? ''}
				`
			}
			type={type}
		/>
	)
}