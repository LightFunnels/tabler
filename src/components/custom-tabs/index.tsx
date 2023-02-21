import React, { Fragment } from 'react';

import styles from './tabs.module.scss';

type Props = {
	className?: string
	items: {
		title: string,
		label: string
		icon?: string
		alert?: string | undefined
	}[]
	active: string
	setActive: (e: string) => void
}

export function CustomTabs(props: Props){
	return (
		<div className={`${styles.tabs} ${props.className ?? ''}`}>
			{props.items.map(item => (
				<div
					key={item.label}
					className={`${props.active === item.label ? 'active' : ''} tab`}
					onClick={() => {
						props.setActive(item.label)
					}}
				>
					{/* {item.icon && (<i className={`icon ${item.icon}`} />)} */}
					<span className='label'>{item.title}{item.alert && <span className={item.alert}></span>}</span>
					{props.active === item.label && <span className='line'/>}
				</div>
			))}
		</div>
	)
}