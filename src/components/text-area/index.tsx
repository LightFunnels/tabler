import React from 'react';

type Props = {
  className?: string
}

export function TextArea({className, ...props}: Props & React.TextareaHTMLAttributes<Element>){
  return (
    <div className={className}>
      <textarea 
        {...props}
        className={`form-control`} 
      />
    </div>
  )
}