import React from "react";


type TableProps = {
	className?: string
	header: React.ReactNode
	body: React.ReactNode
}

import styles from './table.module.scss';

export function Table(props: TableProps){
	return (
		<div className={styles.tableContainer}>
			<table className={`table table-vcenter ${props.className ?? ''}`}>
				<thead className='thead'>
					{props.header}
				</thead>
				<tbody className='tbody'>
					{props.body}
				</tbody>
			</table>
		</div>
	)
}