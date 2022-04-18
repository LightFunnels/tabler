import React from 'react';
import {v4 as uuid} from 'uuid';

type Props = {
  label: string
  options: React.ReactNode[]
  className?: string
}

export function Select(props: Props){
  return (
    <div className={props.className ?? ''}>
      <div className="form-label">{props.label}</div>
      <select className="form-select" >
        {props.options.map((item) => (
          <option key={uuid()}>{item}</option>
        ))}
      </select>
    </div>
  )
}