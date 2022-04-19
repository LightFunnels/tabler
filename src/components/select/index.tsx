import React from 'react';
import {v4 as uuid} from 'uuid';

type Props = {
  className?: string
  options: {label: React.ReactNode, value: string}[]
}

export function Select(props: Props){
  return (
    <div className={props.className}>
      <select className="form-select">
        {props.options.map((item) => (
          <option 
            key={item.value} 
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}