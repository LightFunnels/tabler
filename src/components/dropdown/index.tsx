import React from 'react';
import { usePopper } from 'react-popper';
import {createPortal} from 'react-dom';

type Props = {
	label: string
	link?: boolean
	children: React.ReactNode
}

export function Dropdown(props: Props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [referenceElement, setReferenceElement] = React.useState(null);
  	const [popperElement, setPopperElement] = React.useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {placement: 'bottom-start', modifiers: [ { name: 'offset', options: { offset: [0, 8] } } ]});

  return (
    <div className='dropdown'>
			<a 
				ref={setReferenceElement}
				className={`${props.link ? 'nav-link' : 'btn'} dropdown-toggle`} 
				onClick={() => setIsOpen(!isOpen)}
			>
				{props.label}
			</a>
      {isOpen && createPortal(
        <div
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}
					className={`dropdown-menu d-inline`}
				>
          {props.children}
        </div>,
        document.querySelector('#app')
      )}
    </div>
  );
};
