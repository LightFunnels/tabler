import React from 'react';
import {createPopper, Placement} from "@popperjs/core";
import {createPortal} from 'react-dom';

type Props = {
	label: string
	link?: boolean
	children: React.ReactNode
}

export function Dropdown(props: Props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const dropdown = React.useRef<HTMLDivElement>(null);
	const link = React.useRef<HTMLAnchorElement>(null);

	React.useLayoutEffect(() => {
		if(isOpen){
			function clickOut(event){
				setIsOpen(false);
			}
			setTimeout(() => {
				document.addEventListener("click", clickOut);
			});
			const p = createPopper(
				link.current!,
				dropdown.current!,
				{
					placement: "bottom-end",
					modifiers:[
						{
							name: 'offset',
				      options: {
				        offset: [0, 10],
				      }
						}
					]
				}
			);
			return () => {
				document.removeEventListener("click", clickOut);
				p.destroy();
			}
		}
	}, [isOpen]);

  return (
    <div className='dropdown'>
			<a
				ref={link}
				className={`${props.link ? 'nav-link' : 'btn'} dropdown-toggle`} 
				onClick={() => setIsOpen(true)}
			>
				{props.label}
			</a>
      {
      	isOpen && createPortal(
	        <div
	        	onClick={() => {
	        		setIsOpen(false);
	        	}}
						ref={dropdown}
						className={`dropdown-menu d-inline`}
					>
	          {props.children}
	        </div>,
	        window.modals
	      )
      }
    </div>
  );
};
