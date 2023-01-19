import React, {Fragment} from 'react';
import styles from './tooltip.module.scss';
import {createPopper, Placement} from "@popperjs/core";
import {createPortal} from 'react-dom';

type StaticPopoverProps = {
	target: React.MutableRefObject<HTMLDivElement>
	placement?: Placement
	className?: string
	children: React.ReactNode
}

export const StaticPopover = React.forwardRef<HTMLDivElement, StaticPopoverProps>(
	function (_props, ref) {

 		const {
			target,
			placement,
			className,
			children,
			...props
		} = _props;
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
			</div>,
			window.modals
		) as JSX.Element;

	}
)
