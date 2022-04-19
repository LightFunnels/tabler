import React from 'react';

type Props = {
  className?: string
  children?: string
}

export function Radio({children, className, ...props}: Props & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <label  
      className={`form-check ${className}`}
      children={
        <React.Fragment>
          <input {...props} className="form-check-input" type="radio" />
          {children && <span children={children} className="form-check-label" />}
        </React.Fragment>
      }
    />
  )
}