import React from 'react';

type Props = {
  containerClassName?: string
  label?: string
  checkboxLabel: string
}

export function Radio({label, checkboxLabel, containerClassName, disabled, ...props}: Props & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className={`${containerClassName ?? ''}`}>
      {label && (<div className="form-label">{label}</div>)}
      <div>
        <label className="form-check">
          <input {...props} className="form-check-input" type="radio" />
          <span children={checkboxLabel} className="form-check-label" />
        </label>
      </div>
    </div>   
  )
}