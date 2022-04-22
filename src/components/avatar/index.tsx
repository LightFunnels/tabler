import React from 'react';

type Props = {
	className?: string
	children?: string
	users?: {id: number, first_name: string, avatar: string}[]
}
 
export function Avatar(props : Props){
	return !props.users ? 
		(
			<span 
				className={`avatar ${props.className ?? ''}`} 
				children={props.children} 
			/>
		) : (
			<div className='avatar-list avatar-list-stacked'>
				{props.users.map((item, index) => (
					<img 
						key={item.id+'-'+index}
						className='avatar' 
						src={item.avatar} 
					/>
				))}
			</div>
		)
}