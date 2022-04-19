import React from 'react';

type Props = {
  className?: string
  children?: string
}

export function Checkbox({children, className, ...props}: Props & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className={className}>
      <label 
        className={`form-check`}
        children={
          <React.Fragment>
            <input {...props} className="form-check-input" type="checkbox" />
            {children && <span children={children} className="form-check-label" />}   
          </React.Fragment>
        }  
      />
    </div>
  )
}