import React from 'react';

type Props = {
  className?: string
  children?: string
}

export function Switch({className, children, ...props}: Props & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className={className}>
      <label 
        className={`form-check form-switch`} 
        children={
          <React.Fragment>
            <input {...props} className="form-check-input" type='checkbox' />
            {children && <span children={children} className="form-check-label" />}
          </React.Fragment>
        } 
      />
    </div>
  )
}