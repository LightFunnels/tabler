import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.scss';

type Props = {
	title: string
	body: React.ReactNode
	footer?: React.ReactNode
	className?: string
	setModalState: (e:boolean) => void
	modalState: boolean
}

export function Modal(props : Props) {
	return createPortal(
		<React.Fragment>
			<div className={`${props.modalState ? styles.open : ''}`} onClick={() => props.setModalState(false)} />
			<div className={`modal-dialog ${styles.custom} ${props.className ?? ''}`}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{props.title}</h5>
						<button type="button" onClick={() => props.setModalState(false)} className="btn-close" />
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
		</React.Fragment>,
		document.querySelector('#modals')
	)
}
