import React from 'react';

export type Option = {label: React.ReactNode, value: string};

type Props = {
	options: readonly Option []
	value: string | null
	error?: string | undefined
}

export function Select({className, options, error, ...props}: Props & React.InputHTMLAttributes<HTMLSelectElement>){
	return (
		<div className={className}>
			<select 
				{...props}
				className={`form-select ${error ? 'is-invalid' : ''}`}
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
			{
				error ? ( 
					<div className='invalid-feedback'>{error}</div> 
				) : null
			}
		</div>
	)
}
