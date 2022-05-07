import React from 'react';

type Props = {
	message: React.ReactNode
	dismiss?: () => void
	className?: string
}

export function Toast(props: Props) {
	return (
		<div 
			className={`toast show text-white border-0 ${props.className ?? ''}`}
		>
			<div className="d-flex">
				<div className="toast-body text-black">
					{props.message}
				</div>
				{props.dismiss && (
					<button 
						className={`btn-close me-2 m-auto`} 
						onClick={props.dismiss}
					/>
				)}
			</div>
		</div>
	)
}