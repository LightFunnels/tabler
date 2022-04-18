import React from 'react';
import {Link as RDLink} from 'react-router-dom';

type Props = {
  className?: string
  to: string
  native: boolean
  children: React.ReactNode
}

export function Link(props: Props){
  return (
    <React.Fragment>
      {!props.native && (
          <RDLink 
            className={`alert-link ${props.className ?? ''}`} 
            children={props.children} 
            to={props.to} 
          />
        )
      }
      {props.native && (
        <a 
          href={props.to} 
          className={`alert-link ${props.className ?? ''}`}
          children={props.children}
        />
      )}
    </React.Fragment>
  )
}