import React from 'react';
import './toast.scss';

type Props = {
	className?: string
	dismiss?: () => void
	message: React.ReactNode
	timeout?: number
}

export function Toast(props: Props) {
	
	const [hide, setHide] = React.useState(false);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setHide(true)
		}, props.timeout ?? 3000);
		return () => clearTimeout(timer);
	}, []);

	return !hide ? (
		<div
			className={`toast customToast p-2 text-center ${!hide ? 'showToast' : ''} ${props.className ?? ''}`}
		>
			<div className="d-flex">
				<div className="toast-body">
					{props.message}
				</div>
				{props.dismiss && (
					<button 
						className={`btn-close me-2 m-auto`} 
						onClick={props.dismiss}
					/>
				)}
			</div>
		</div>
	) : null
}