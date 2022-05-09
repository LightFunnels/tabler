import React from 'react';
// import { usePopper, PopperChildrenProps } from 'react-popper';
import Popper from 'popper.js';
import styles from './tooltip.scss';
import Bugsnag from '@bugsnag/js';


export interface StaticPopoverProps{
	target: React.MutableRefObject<HTMLElement>
	placement?: Popper.Placement
	flipEnabled?: boolean
	parentOverflowEnabled?: boolean
	className?: string
	arrowClassName?: any
	children: React.ReactNode
	positionFixed?: boolean
}

export const StaticPopover = React.forwardRef(
 function ({
		target,
		placement,
		flipEnabled,
		parentOverflowEnabled,
		className,
		arrowClassName,
		children,
		// positionFixed,
		...props
	}: StaticPopoverProps, ref: React.MutableRefObject<HTMLElement>|null) {

		let refPopover = React.useRef<any>();
		let refArrow = React.useRef<any>();

		React.useLayoutEffect(
			function () {
				let p = new Popper(
					target.current,
					refPopover.current,
					{
						placement: placement || 'bottom',
						modifiers:{
							arrow:{
								element: refArrow.current
							},
							flip: {
								enabled: flipEnabled !== undefined ? flipEnabled : true,
							},
							preventOverflow: {
								enabled: parentOverflowEnabled !== undefined ? parentOverflowEnabled : true,
							},
							// positionFixed: positionFixed
						}
					}
				);
				return () => {
					p.destroy();
				}
			},
			[]
		);

		return (
			<div
				{...props}
				className={styles.popover + ' ' + (className || '')}
				ref={(e) => {
					refPopover.current = e;
					if(ref && e){
						ref.current = e;
					}
				}}
			>
				<div className={styles.arrow + ' ' + (arrowClassName) } ref={refArrow} ></div>
				{children}
			</div>
		)
	}
)

type UsePopover = {disabled?: boolean, delay?: number, keepDelay?: number, ref?: React.MutableRefObject<HTMLDivElement|null>};
export function usePopover(opts: UsePopover = {disabled: false, delay: 0, keepDelay: 0, ref: undefined}): [React.MutableRefObject<any>, boolean] {

	const targetRef = React.useRef<HTMLElement>();
	const [show, setShow] = React.useState(false);
	const ref = React.useRef<any>({});

	React.useLayoutEffect(
		function () {
			if(opts.disabled){
				return;
			}
			function mouseover(event) {
				ref.current.status = 'over';
				setTimeout(
					function () {
						if(ref.current.status !== 'left'){
							setShow(true);
						}
					},
					opts.delay || 0
				);
			}
			function mouseleave(event) {
				Promise.race([
					opts.ref && opts.ref.current ?
					new Promise(function(resolve){
						opts.ref!.current!.addEventListener('mouseenter', function (){
							resolve(true);
						}, {once: true});
					}) : Promise.resolve(false),
					new Promise(function(resolve){
						setTimeout(() => (resolve(false)), opts.keepDelay);
					})
				])
				.then(
					function(e){
						function close(){
							setShow(false);
							ref.current.status = 'left';
						}
						if(e === true){
							opts.ref!.current!.addEventListener('mouseleave', close, {once: true})
						} else {
							close();
						}
					}
				);
			}
			if(!targetRef.current){
				console.log('notify error');
				Bugsnag.notify('Popover error');
				return;
			}
			targetRef.current!.addEventListener('mouseover', mouseover);
			targetRef.current!.addEventListener('mouseleave', mouseleave);
			return () => {
				// I still don't know why this is happening
				if(targetRef.current){
					targetRef.current!.removeEventListener('mouseover', mouseover);
					targetRef.current!.removeEventListener('mouseleave', mouseleave);
				}
			}
		},
		[opts.disabled]
	);

	return [targetRef, show];
}