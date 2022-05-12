import React from "react";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	type?: 'primary' | 'danger' | undefined
	loading?: boolean
	btnType?: "button" | "submit" | "reset" | undefined
}

export function Button({ title, className, type, loading, btnType, children, ...props }: Props) {
	return (
		<button
			{...props}
			className={`btn ${className ?? ''} ${loading ? 'btn-loading' : ''} ${type === 'primary' ? 'btn-primary' : type === 'danger' ? 'btn-danger' : ''}`}
			type={btnType}
		>
			{children}
		</button>
	)
}