import React, { Fragment } from 'react';

type Props = {
  componentData: Array<{ 
    name: string, 
    icon: string, 
    value: string|number,
    growth: number, 
  }>,
  hasCompare: boolean
}

import styles from './stats.module.scss';

export function Stats(props: Props){
  return (
		<div className={`${styles.stats}`}>
			{
				props.componentData.map( (item) => {
					const cond = item.growth >= 0;
					return (
						<div 
							key={item.name} 
							className={`stat-container`}
						>
							<div className={`stat-header`}>
								<i className={`icon ti ${item.icon}`} />
								<span className={`stat-title`}>{item.name}</span>
							</div>
							<div className='stat-body'>
								<span className='value'>
									{item.value}
								</span> 
								<span className={`${cond ? 'green' : 'red'}`}>
									{
										props.hasCompare && (
											<Fragment>
												<i className={`arrow-icon ${cond ? 'ti-arrow-curve-left icon-arrow-up21' : 'ti-ArrowDownRight icon-arrow-down21'}`}/>
												{item.growth}%
											</Fragment>
										)
									}
								</span>
							</div>
						</div>
					)
				})
			}
		</div>
  )
}
