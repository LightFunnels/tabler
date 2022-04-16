import React from 'react';

type Props = {
  className?: string
  placeholder?: string
  name?: string
  value: string
  onChange: (e) => void
}

export function TextArea(props: Props){
  return (
    <textarea 
      className={`form-control ${props.className}`} 
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )
}