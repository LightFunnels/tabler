import React from 'react';
import { createPopper, Placement } from "@popperjs/core";
import { createPortal } from 'react-dom';

type Props = {
	label: React.ReactNode
	link?: boolean
	children: React.ReactNode
	onScroll?: (e: React.FormEvent<HTMLDivElement>) => void
}

export function Dropdown(props: Props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const dropdown = React.useRef<HTMLDivElement>(null);
	const link = React.useRef<HTMLAnchorElement>(null);

	React.useLayoutEffect(() => {
		if (isOpen) {
			// function clickOut(event) {
			// 	setIsOpen(false);
			// }
			setTimeout(() => {
				document.addEventListener("click", (event)=> {
					setIsOpen(false);
				});
			});
			const p = createPopper(
				link.current!,
				dropdown.current!,
				{
					placement: "bottom-end",
					modifiers: [
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
				document.removeEventListener("click", (event)=> {
					setIsOpen(false);
				});
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
					<div onScroll={props.onScroll}

						onClick={() => {
							setIsOpen(false);
						}}
						ref={dropdown}
						className={`dropdown-menu d-inline`}
					>
						{props.children}
					</div>,
					window.modals
				) as JSX.Element
			}
		</div>
	);
};
