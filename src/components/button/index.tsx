import React from "react";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	title?: string
	type?: 'primary' | 'danger' | undefined
	loading?: boolean
	btnType?: "button" | "submit" | "reset" | undefined
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}


export function Button({ title, className, type, loading, btnType, iconLeft, iconRight, ...props }: Props) {
	return (
		<button
			{...props}
			className={
				`	btn
					${className ?? ''}
					${type === 'primary' ? 'btn-primary' : type === 'danger' ? 'btn-danger' : ''}
				`
			}
			type={btnType}
		>{iconLeft}{title}{iconRight}</button>
	)
}