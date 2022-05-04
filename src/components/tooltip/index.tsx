import React from 'react';
import { usePopper, PopperChildrenProps } from 'react-popper';

type Props = {
	element: React.ReactNode
	tooltip: React.ReactNode
	placement?: PopperChildrenProps["placement"] | undefined
}

export function Tooltip(props: Props){
	const [refElem, setRefElem] = React.useState(undefined);
	const [popElem, setPopElem] = React.useState(undefined);
	const [show, setShow] = React.useState(false);
	const [arrowClass, setArrowClass] = React.useState('');

	const { styles, attributes } = usePopper(refElem, popElem, { placement: props.placement ?? 'bottom-start', modifiers: [ { name: 'offset', options: { offset: [0, 4] } }] });

	function arrowPlacement(placement){
		switch(placement){
			case 'top':
				case 'top-end':
					case 'top-start':
						setArrowClass('bs-tooltip-top');
					break;
			case 'bottom':
				case 'bottom-end':
					case 'bottom-start':
						setArrowClass('bs-tooltip-bottom');
					break;
			case 'left':
				case 'left-start':
					case 'left-end':
						setArrowClass('bs-tooltip-start');
					break;
			case 'right':
				case 'right-start':
					case 'right-end':
						setArrowClass('bs-tooltip-end');
					break;
			default: setArrowClass('bs-tooltip-bottom');
		}
	}

	React.useEffect(() => {
		arrowPlacement(props.placement);
	}, [])

	return (
		<React.Fragment>
			<div 
				onMouseOver={() => setShow(true)} 
				onMouseLeave={() => setShow(false)} 
				ref={setRefElem}
				className='border'
			>
				{props.element}
			</div>
			<div 
				ref={setPopElem} 
				className={`tooltip ${show ? 'show' : ''} ${arrowClass} `} 
				style={styles.popper} 
				{...attributes.popper}
			>
				<div className="tooltip-arrow"></div>
				<div className="tooltip-inner">
					{props.tooltip}
				</div>
			</div>
		</React.Fragment>
	)
}