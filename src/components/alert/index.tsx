import React from 'react';

type Props = {
	className?: string
	dismiss?: () => void
	children?: React.ReactNode
	linkChildren?: React.ReactNode
	icon?: React.ReactNode
	avatar?: string
	background?: string
}

export function Alert(props: Props) {
	return (
		<div className={`alert ${props.dismiss ? 'alert-dismissible' : ''} ${props.background ?? ''} ${props.className ?? ''}`}>
			{!props.dismiss && props.children}
			{
				props.dismiss && (
					<div className='d-flex'>
						{props.icon && <i className={`icon ti ${props.icon}`} />}
						{props.avatar && <img className='avatar float-start me-3' src={props.avatar} alt='avatar' />}
						<div>
							{props.children}
						</div>
						<a
							className={`btn-close ${props.background ? 'btn-close-white' : ''}`}
							onClick={props.dismiss}
						/>
					</div>
				)
			}
			{props.linkChildren}
		</div>
	)
}