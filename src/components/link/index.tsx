import React from 'react';
// import {Link as RouterLink} from 'react-router-dom';

type Props = {
  to: string
  children: React.ReactNode | string
}

export function Link(props: Props){
  return (
    <a 
      href={props.to} 
      className="alert-link"
      children={props.children}
    />
  )
}