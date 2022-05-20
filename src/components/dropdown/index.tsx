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
			function clickOut(event) {
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
				document.removeEventListener("click", clickOut);
				p.destroy();
			}
		}
	}, [isOpen]);

	return (
		<div className='dropdown' >
			<a
				ref={link}
				className={`${props.link ? 'nav-link' : 'btn'} dropdown-toggle w-full d-flex justify-content-between`}
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
						className={`dropdown-menu d-inline w-25`}
					>
						{props.children}
					</div>,
					window.modals
				)
			}
		</div>
	);
};
