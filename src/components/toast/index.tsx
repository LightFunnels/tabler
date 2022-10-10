import React from 'react';
import styles from './toast.scss';
import {createPortal} from "react-dom";

type Props = {
	className?: string
	dismiss?: () => void
	message: React.ReactNode
	timeout?: number
}

export function Toast(props: Props) {

	return (
		createPortal(
			<div
				className={`toast ${styles.customToast} p-2 text-center ${styles.showToast} show ${props.className ?? ''} bg-dark`}
			>
				<div className="d-flex">
					<div className="toast-body">
						{props.message}
					</div>
					{props.dismiss && (
						<button 
							className={`btn-close btn-close-white me-2 m-auto`} 
							onClick={props.dismiss}
						/>
					)}
				</div>
			</div>,
			document.getElementById("modals")!
		)
	);

}