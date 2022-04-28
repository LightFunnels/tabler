import React from 'react';
import { usePopper } from 'react-popper';
import {createPortal} from 'react-dom';

type Props = {
	className?: string
	btnClass?: string
	children: React.ReactNode
	label: string
}

export function Dropdown(props: Props) {
	const [isOpen, setIsOpen] = React.useState(false);
  const refElem = React.useRef(null);
  const popElem = React.useRef(null);

  const { styles, attributes } = usePopper(refElem.current, popElem.current);

  return (
    <React.Fragment>
      <button 
				ref={refElem}
				className={`btn ${props.btnClass ?? ''}`}
				onClick={() => setIsOpen(!isOpen)}
				type="button" 
			>
        {props.label}
      </button>

      {isOpen && createPortal(
        <div
					className={`${props.className}`}
          ref={popElem}
          style={styles.popper}
          {...attributes.popper}
        >
          {props.children}
        </div>,
        document.querySelector('#app')
      )}
    </React.Fragment>
  );
};
