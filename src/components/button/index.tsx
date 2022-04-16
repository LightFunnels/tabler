import React from "react";

type Props = {
	loading?: boolean
	children: React.ReactNode

	primary?: boolean
	danger?: boolean
	className?: string

	disabled?: boolean
	onClick?: () => void
	fullWidth?: boolean
	type?: string
}

export function Button(props: Props){
	return (
	<button 
		children={props.children} 
		className={
			`	btn
				${props.fullWidth ? 'w-full' : ''}
				${props.loading ? 'btn-loading' : ''} 
				${props.primary ? 'btn-primary' : ''}
				${props.danger ? 'btn-danger' : ''}
				${props.className}
			`
		} 
		onClick={props.onClick}
		disabled={props.disabled}
		type={props.type}
	/>
	)
}