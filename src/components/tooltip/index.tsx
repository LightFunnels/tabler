import React from 'react';
import styles from './tooltip.scss';
import {createPopper, Placement} from "@popperjs/core";
import {createPortal} from 'react-dom';

type StaticPopoverProps = {
	target: React.MutableRefObject<HTMLElement>
	placement?: Placement
	className?: string
	children: React.ReactNode
}

export const StaticPopover = React.forwardRef(
 function ({
		target,
		placement,
		className,
		children,
		...props
	}: StaticPopoverProps, ref: React.MutableRefObject<HTMLElement>|null) {

		let refPopover = React.useRef<HTMLDivElement>(null);

		React.useEffect(
			function () {
				const p = createPopper(target.current, refPopover.current!, {modifiers: [{name: 'offset', options: { offset: [0, 10], }, },], placement: placement ?? 'bottom'},);
				return () => {
					p.destroy();
				}
			},
			[]
		);

		return createPortal(
			<div
				{...props}
				className={`${styles.pop} ${className ?? ''}`}
				ref={refPopover}
			>
				<div data-popper-arrow className='arr'></div>
				{children}
			</div>
		, window.modals)
	}
)
