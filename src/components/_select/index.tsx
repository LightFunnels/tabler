import React from 'react';

export type Option = {label: React.ReactNode, value: string};

type Props = {
	options: readonly Option []
	value: string | null
}

export function Select({className, options, ...props}: Props & React.InputHTMLAttributes<HTMLSelectElement>){
	return (
		<div className={className}>
			<select 
				{...props}
				className="form-select"
			>
				{
					options.map((item) => (
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
