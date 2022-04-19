import React from 'react';
import {v4 as uuid} from 'uuid';

export type Option = {label: React.ReactNode, value: string};

type Props = {
	className?: string
	options: Option[]
}

export function Select(props: Props & React.InputHTMLAttributes<HTMLSelectElement>){
	return (
		<div className={props.className}>
			<select className="form-select">
				{
					props.options.map((item) => (
						<option 
							key={item.value} 
							value={item.value}
						>
							{item.label}
						</option>
					))
				}
			</select>
		</div>
	)
}
