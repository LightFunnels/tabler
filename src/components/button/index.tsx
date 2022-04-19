import React from "react";

type Props = {
	className?: string
	loading?: boolean
	type?: string
	fullWidth?: boolean
	htmlType?: string
}

export function Button({loading, fullWidth, htmlType, type, ...props}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>){
	return (
		<button
			{...props}
			className={
				`	btn
					${fullWidth ? 'w-full' : ''}
					${loading ? 'btn-loading' : ''} 
					${type === 'primary' ? 'btn-primary' : type === 'danger' ? 'btn-danger' : ''}
					${props.className}
				`
			}
			type={htmlType}
		/>
	)
}