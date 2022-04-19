import React from 'react';
import {Link as RDLink, LinkProps} from 'react-router-dom';

type Props = {
  className?: string
  native: boolean
}

export function Link({className, native, ...props}: Props & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>,
  ){
  return (
    <React.Fragment>
      {!props.native && (
          <RDLink 
            {...props}
            className={`alert-link ${className}`} 
          />
        )
      }
      {props.native && (
        <a 
          {...props}
          className={`alert-link ${className}`}
        />
      )}
    </React.Fragment>
  )
}