import React from 'react';
import { createPortal } from 'react-dom';
import './styles.css'

type Props = {
	title: string
	body: React.ReactNode
	footer?: React.ReactNode
	className?: string
	close: () => void
	isOpen?: boolean
}

Modal.useModalState = function(initial: Boolean = false) {
	const [state, setState] = React.useState(initial);
	return [
		state,
		function(){setState(true)},
		function(){setState(false)}
	] as const;
}

export function Modal(props : Props) {
	return createPortal(
		<div className={`modal fade ${props.isOpen ? 'open' : ''} ${props.className ?? ''}`}>
			<div className={`modal-dialog custom`}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{props.title}</h5>
						<button type="button" onClick={props.close} className="btn-close" />
					</div>
					<div className="modal-body">
						{props.body}
					</div>
					{props.footer && (
						<div className="modal-footer">
							{props.footer}
						</div>
					)}
				</div>
			</div>
		</div>,
		document.querySelector('#modals')
	)
}
