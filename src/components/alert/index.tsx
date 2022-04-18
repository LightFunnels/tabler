{/*
  Alerts:
    Alert messages are used to inform users of the status of their action and help them solve any problems that might have occurred.
    Learn more about different alert layouts https://preview.tabler.io/docs/alerts.html
    Learn more about alerts in bootstrap https://getbootstrap.com/docs/5.0/components/alerts/
*/}

import React from 'react';

type Props = {
  className?: string
  dismissible?: boolean
  title?: React.ReactNode
  children?: React.ReactNode
  linkChildren?: React.ReactNode
  icon?: React.ReactNode
  avatar?: React.ReactNode
  background?: string
  onClick?: () => void
}

export function Alert(props: Props){
  return (
    <React.Fragment>
      <div className={`alert ${props.className ?? props.className} ${props.dismissible ? 'alert-dismissible' : ''} ${props.background ?? ''}`}>
        {!props.dismissible && (
          <React.Fragment>
            {props.title}
            {props.children}
          </React.Fragment>
        )}
        {props.dismissible && (
          <React.Fragment>
            <div className='d-flex'>
              {props.icon && <i className={`icon alert-icon ti ti-${props.icon}`} />}
              {props.avatar && <img className='avatar float-start me-3' src={props.avatar} alt='avatar' />}
              <div>
                {props.title}
                {props.children}
              </div>
              <a 
                className={`btn-close ${props.background ? 'btn-close-white' : ''}`} 
                onClick={props.onClick} 
              />
            </div>
          </React.Fragment>
        )}
        {props.linkChildren}
      </div>  
     
  
    </React.Fragment>
  )
}