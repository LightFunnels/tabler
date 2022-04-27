import React from 'react';

type Props = {
	show?: boolean
	message?: string
	dismiss?: () => void
}

export function Toast(props: Props) {
	return (
		<div id="liveToast" className={`toast fade align-items-center ${props.show ? "show" : "hide"} text-white bg-dark border-0`}>
			<div className="d-flex">
				<div className="toast-body">
					{props.message}
				</div>
				<button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={props.dismiss}></button>
			</div>
		</div>
	)
}