import React from 'react';

type Props = {
	show?: boolean
	message?: React.ReactNode
	dismiss?: () => void
	className?: string
}

export function Toast(props: Props) {
	return (
		<div 
			className={`toast ${props.show ? "show" : "hide"} text-white border-0 ${props.className ?? ''}`}
		>
			<div className="d-flex">
				<div className="toast-body text-black">
					{props.message}
				</div>
				<button 
					className={`btn-close me-2 m-auto`} 
					type="button" 
					onClick={props.dismiss}
				/>
			</div>
		</div>
	)
}