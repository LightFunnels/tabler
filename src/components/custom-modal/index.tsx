import React, { Fragment } from 'react';

type ModalProps = {
	onClose: () => void
	header: React.ReactNode
	body: React.ReactNode
	show: boolean
	className?: string
}

import styles from './modal.scss';

export function CustomModal(props: ModalProps){
	return (
		<Fragment>
			<div className={`${styles.customModalOverlay} ${props.show ? 'showOverlay' : ''}`} onClick={props.onClose} />
			<div className={`${styles.customModal} ${props.show ? 'showModal' : ''} ${props.className ?? ''}`}>
				{props.header}
				{props.body}
			</div>
		</Fragment>
	)
}