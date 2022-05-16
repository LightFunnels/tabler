import React from 'react';
import styles from './tooltip.scss';
import {createPopper, Placement} from "@popperjs/core";

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
				const p = createPopper(target.current, refPopover.current!);
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
				ref={refPopover}
			>
				<div data-popper-arrow className={styles.arrow} ></div>
				{children}
			</div>
		)
	}
)

// type UsePopover = {disabled?: boolean, delay?: number, keepDelay?: number, ref?: React.MutableRefObject<HTMLDivElement|null>};
// export function usePopover(opts: UsePopover = {disabled: false, delay: 0, keepDelay: 0, ref: undefined}): [React.MutableRefObject<any>, boolean] {

// 	const targetRef = React.useRef<HTMLElement>();
// 	const [show, setShow] = React.useState(false);
// 	const ref = React.useRef<any>({});

// 	React.useLayoutEffect(
// 		function () {
// 			if(opts.disabled){
// 				return;
// 			}
// 			function mouseover(event) {
// 				ref.current.status = 'over';
// 				setTimeout(
// 					function () {
// 						if(ref.current.status !== 'left'){
// 							setShow(true);
// 						}
// 					},
// 					opts.delay || 0
// 				);
// 			}
// 			function mouseleave(event) {
// 				Promise.race([
// 					opts.ref && opts.ref.current ?
// 					new Promise(function(resolve){
// 						opts.ref!.current!.addEventListener('mouseenter', function (){
// 							resolve(true);
// 						}, {once: true});
// 					}) : Promise.resolve(false),
// 					new Promise(function(resolve){
// 						setTimeout(() => (resolve(false)), opts.keepDelay);
// 					})
// 				])
// 				.then(
// 					function(e){
// 						function close(){
// 							setShow(false);
// 							ref.current.status = 'left';
// 						}
// 						if(e === true){
// 							opts.ref!.current!.addEventListener('mouseleave', close, {once: true})
// 						} else {
// 							close();
// 						}
// 					}
// 				);
// 			}
// 			if(!targetRef.current){
// 				console.log('notify error');
// 				return;
// 			}
// 			targetRef.current!.addEventListener('mouseover', mouseover);
// 			targetRef.current!.addEventListener('mouseleave', mouseleave);
// 			return () => {
// 				// I still don't know why this is happening
// 				if(targetRef.current){
// 					targetRef.current!.removeEventListener('mouseover', mouseover);
// 					targetRef.current!.removeEventListener('mouseleave', mouseleave);
// 				}
// 			}
// 		},
// 		[opts.disabled]
// 	);

// 	return [targetRef, show];
// }