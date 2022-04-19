import React from 'react';

type Props = {
  className?: string
  title?: React.ReactNode
  titleClass?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function Card(props: Props){
  return (
    <div className={`card ${props.className}`}>
      {props.title && (
        <div className={`${props.actions ? 'd-flex align-items-center justify-content-between' : ''} ${props.titleClass}`}>
          <h3 className="card-title">{props.title}</h3>
          {props.actions}
        </div>
      )}
      <div className="card-body">
        {props.children}
      </div>
    </div>
  )
}