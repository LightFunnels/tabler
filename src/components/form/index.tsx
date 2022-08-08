import React from 'react';
import styles from './form.scss';
import { createPopper, Instance } from '@popperjs/core';
import type { PopperOptions } from 'popper.js';
type Props = {
	label?: React.ReactNode
	light?: boolean
	className?: string
	children: React.ReactNode
	customLabel?: string
}

export function FormGroup({ label, light, ...props }: Props) {
	return (
		<div className={`${props.className || ""} `} >
			{label && <Label className={props.customLabel} light={light} >{label}</Label>}
			{props.children}
		</div>
	);
}


type LabelProps = {
	light?: boolean
	className?: string
	children: React.ReactNode
}

export function Label({light, ...props}: LabelProps) {
	return <label {...props} className={styles.label + ' ' + (props.className || '') + ' ' + (light ? 'light' : '')} />;
}




export type UseToggleOpts = {
	state?: boolean
	key?: any
	disabled?: boolean
	placement?: PopperOptions["placement"]
}
type UseToggle4Return = [
	React.MutableRefObject<HTMLDivElement>,
	React.MutableRefObject<HTMLDivElement>,
	boolean,
	(state: boolean) => void,
	React.MutableRefObject<Instance | null>
];
export function useToggle(options: UseToggleOpts = {}): UseToggle4Return {
	let [isOpen, setIsOpen] = React.useState<boolean>(options.state || false);
	let ref = React.useRef<HTMLElement>(null);
	let refMenu = React.useRef<HTMLElement>(null);
	let popper = React.useRef<Instance | null>(null);

	React.useEffect(
		function () {
			// if options are disabled break;
			if (options.disabled) {
				return;
			}

			// console.log(options.key);
			let btnClick, documentClick, tm;

			// if the modal is already open
			if (isOpen) {

				if (!ref.current || !refMenu.current) {
					throw new Error('missing one of ref, refMenu');
				}
				refMenu.current!.style.minWidth = ref.current!.offsetWidth + "px";
				let opts: {placement?, modifiers?, onFirstUpdate?} = {
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 8]
							}
						},
					]
				};
				if (options.placement) {
					opts.placement = options.placement;
				}
				popper.current = createPopper(
					ref.current,
					refMenu.current,
					opts
				);
				// click event handler
				documentClick = function (event) {
					if (
						// ignore input, load more button clicks
						// (event.canceler === refMenu.current)						
						event.canceler?.includes(refMenu.current)
					) {
						return;
					}
					setIsOpen(false);
				}

				tm = setTimeout(
					function () {
						document.addEventListener('click', documentClick)
					}
				);

			} else {
				btnClick = () => setIsOpen(true);
				if (ref.current) {
					ref.current.addEventListener('click', btnClick)
				}
			}

			return () => {
				if (tm) {
					clearTimeout(tm);
				}
				if (popper.current) {
					popper.current.destroy();
					popper.current = null;
					document.removeEventListener(
						'click',
						documentClick
					);
				}
				if (btnClick && ref.current) {
					ref.current.removeEventListener(
						'click',
						btnClick,
					)
				}
			}

		},
		[isOpen, options.key, options.disabled]
	);

	return [
		ref as React.MutableRefObject<HTMLDivElement>,
		refMenu as React.MutableRefObject<HTMLDivElement>,
		isOpen,
		setIsOpen,
		popper
	];
}