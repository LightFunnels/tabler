import React from 'react';

type Props = {
  containerClassName?: string
  content: string
  label: string
}

export function Switch({containerClassName, content, label, disabled, ...props}: Props & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className={`${containerClassName ?? ''}`}>
      <div className="form-label">{label}</div>
      <label 
        children={
          <React.Fragment>
            <input {...props} className="form-check-input" type='checkbox' />
            <span children={content} className="form-check-label" />
          </React.Fragment>
        } 
        className={`form-check form-switch`} 
      />
    </div>
  )
}