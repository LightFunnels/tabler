import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

type Props = {
	title: string
	body: React.ReactNode
	footer?: React.ReactNode
	className?: string
	// setModalState: (e:boolean) => void
	onClose: () => void
}

export function Modal(props : Props) {
	return createPortal(
		<React.Fragment>
			<div className={`modal ${styles.modal}`} id="modal-simple">
				<div className={styles.overlay} onClick={props.onClose} />
				<div className={`modal-dialog modal-dialog-centered`}>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{props.title}</h5>
							<button type="button" onClick={props.onClose} className="btn-close" />
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
			</div>
		</React.Fragment>,
		window.modals
	)
}
