import React from 'react';

type Props = {
  className?: string
  children?: React.ReactNode
  onSubmit?: (e) => void
}

export function Form(props: Props){
  return (
    <form
      className={props.className}
      children={props.children}
      onSubmit={props.onSubmit}
    />
  )
}