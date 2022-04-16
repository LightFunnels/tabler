import React from 'react';

type Props = {
  className?: string
  placeholder?: string
  name?: string
  value: string
  onChange: (e) => void
}

export function Input(props: Props){
  return (
    <input 
      className={`form-control ${props.className}`} 
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange} 
      type='text' 
    />
  )
}