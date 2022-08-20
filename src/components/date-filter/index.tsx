import React, { Fragment } from "react";
import ReactDatePicker from "react-datepicker";
import lodash from 'lodash';
import dateformat from 'dateformat'
import styles from "./date-picker.scss";
import {createPortal} from "react-dom";
import {
	Select,
	Button,
	// InputComponent,
	useToggle,
} from '..'
// import {
// 	ErrorView,
// } from '../index'

const frmt = 'yyyy-mm-dd HH:MM:ss';

// we must validate the given property, it must match the given format
// type Props = {
// 	onChange: (a: string | null) => void
// 	name?
// 	value: string | null
// 	error?: string
// 	displayFormat?: string
// 	popperPlacement?: string
// 	isClearable?: boolean
// 	maxDate?: Date
// 	minDate?: Date
// }
// export function DatePickerComponent({ name, error, value, ...props }: Props) {
// 	const selected = React.useMemo(() => (value ? new Date(SafeDate(value)) : null), [value]);
// 	return (
// 		<div className={styles.datePicker}>
// 			<ReactDatePicker
// 				{...props}
// 				customInput={<DatePickerInput displayformat={props.displayFormat} onChange={lodash.noop} value={""} />}
// 				selected={selected}
// 				renderCustomHeader={
// 					function (e) {
// 						return (
// 							<div className="react-datepicker__current-month" >
// 								<i
// 									className="navigationIcon left icon-arrow-left1"
// 									onClick={e.decreaseMonth}
// 								/>
// 								<span className="label">
// 									{dateformat(SafeDate(e.date), `mmmm yyyy`)}
// 								</span>
// 								<i
// 									className="navigationIcon right icon-arrow-right1"
// 									onClick={e.increaseMonth}
// 								/>
// 							</div>
// 						)
// 					}
// 				}
// 				onChange={
// 					function (value) {
// 						if (value) {
// 							value.setHours(0, 0, 0, 0);
// 							props.onChange(format(value));
// 						} else {
// 							props.onChange(null);
// 						}
// 					}
// 				}
// 			/>
// 			<ErrorView error={error} />
// 		</div>
// 	);
// }

type RangeDatePickerComponentProps = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	append?: React.ReactNode
	onCancel: () => void
	disabled?: boolean
	onChange: (val: RangeDatePickerComponentProps["value"]) => void
}
export function RangeDatePickerComponent(props: RangeDatePickerComponentProps) {

	const [tempvalue, tempChange] = React.useState(props.value);
	const today = React.useMemo(() => new Date(), []);

	const startDate = React.useMemo(
		() => {
			if (!tempvalue.startDate){
				return null;
			}
			let d = new Date(SafeDate(tempvalue.startDate));
			d.setHours(0, 0, 0, 0);
			return d;
		},
		[tempvalue.startDate]
	);
	const endDate = React.useMemo(
		() => {
			if (!tempvalue.endDate)
				return null;
			let d = new Date(SafeDate(tempvalue.endDate));
			d.setHours(23, 59, 59, 0);
			return d;
		},
		[tempvalue.endDate]
	);

	const [endDateHover, setEndDateHover] = React.useState<number | null>(null);

	const [v, sv] = React.useState(() => new Date());
	const R = React.useRef({
		left: undefined as any,
		right: undefined as any
	});

	const leftDate = React.useMemo(
		function () {
			let nd = new Date(SafeDate(v));
			nd.setDate(0);
			return nd;
		},
		[v]
	);

	function onDatePickerChange(date: Date) {
		let newValue: RangeDatePickerComponentProps["value"];
		// console.log(startDate)
		// if(!startDate){
		// 	date.setHours(0, 0, 0, 0);
		// } else {
		// 	date.setHours(23, 59, 59, 0);
		// }
		if (
			endDate ||
			!startDate ||
			// or the user selected earlier value than the pre selected start date
			(
				tempvalue.startDate &&
				(new Date(SafeDate(tempvalue.startDate)).getTime() > date.getTime())
			)
		) {
			date.setHours(0, 0, 0, 0);
			newValue = {
				endDate: null,
				startDate: format(date)
			};
		} else {
			setEndDateHover(null);
			date.setHours(23, 59, 59, 0);
			newValue = {
				startDate: tempvalue.startDate,
				endDate: format(date),
			};
		}
		tempChange(newValue);
	}

	function dayClassName(_day) {

		let dayStart = new Date(_day);
		dayStart.setHours(0, 0, 0, 0);
		let dayEnd = new Date(dayStart);
		dayEnd.setHours(23, 59, 59, 0);

		let stringNow = dateformat(SafeDate(dayStart), 'yyyy-mm-dd HH:MM:ss');
		let stringEnd = dateformat(SafeDate(dayEnd), 'yyyy-mm-dd HH:MM:ss');
		let className = `day-${dateformat(SafeDate(dayStart), 'yyyy-mm-dd')} `;
		let nowTime = dayStart.getTime();

		if (
			endDateHover && ((nowTime <= endDateHover) && (nowTime >= startDate!.getTime()))
		) {
			className += ' react-datepicker__day--in-selecting-range ';
		}

		if (
			(stringNow === tempvalue.startDate) ||
			(stringEnd === tempvalue.endDate)
		) {
			className += " edgeRange ";
		} else if ((dayStart > (startDate as Date)) && (dayStart < (endDate as Date))) {
			className += " react-datepicker__day--in-range";
		}
		return className;
	}

	function onMouseOver(event) {
		if (event.target.classList.contains('react-datepicker__day')) {
			let date = new Date(
				SafeDate(event.target.className.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g))
			);
			setEndDateHover(date.getTime());
		}
	}

	const active = React.useMemo(() => {
		let foudnValue = types.find(val => {
			return lodash.isEqual(
				{
					startDate: dateformat(startDate, 'yyyy-mm-dd HH:MM:ss'),
					endDate: dateformat(endDate, 'yyyy-mm-dd HH:MM:ss'),
				},
				generateFromValue(val.value)
			)
		});
		return foudnValue?.value ?? "custom";
	}, [startDate, endDate]);

	return (
		<div className={styles.rangeDatePicker}>
			<div className="aligner">
			<div className="content" >
				<div className={'body '/* + ' ' + (props.bodyClassName || '')*/}>
					<div className="formGrid" onMouseOver={(startDate && !endDate) ? onMouseOver : undefined} >
						<ReactDatePicker
							openToDate={leftDate}
							inline
							onChange={(date) => {
								onDatePickerChange(date);
							}}
							dayClassName={dayClassName}
							renderCustomHeader={
								function (e) {
									R.current.left = e;
									return (
										<div className="react-datepicker__current-month" >
											<i
												className={"navigationIcon left icon-arrow-left1 " + (e.prevMonthButtonDisabled ? 'disabled' : '') }
												onClick={
													function () {
														R.current.right.decreaseMonth();
														e.decreaseMonth()
													}
												}
											/>
											<span className="label">
												{dateformat(SafeDate(e.date), `mmmm yyyy`)}
											</span>
										</div>
									)
								}
							}
						/>
						<ReactDatePicker
							openToDate={v}
							onChange={(date) => {
								sv(date);
								onDatePickerChange(date);
							}}
							dayClassName={dayClassName}
							renderCustomHeader={
								function (e) {
									R.current.right = e;
									return (
										<div className="react-datepicker__current-month" >
											<span className="label">{dateformat(SafeDate(e.date), `mmmm yyyy`)}</span>
											<i
												className={"navigationIcon right icon-arrow-right1 " + (e.nextMonthButtonDisabled ? 'disabled' : '')}
												onClick={
													function () {
														R.current.left.increaseMonth();
														e.increaseMonth();
													}
												}
											/>
										</div>
									)
								}
							}
							inline
							maxDate={today}
						/>
					</div>
					{ props.append }
				</div>
			</div>
				{
					window.innerWidth < 425 ? (
						<Select
						  // label='Select a date'
							options={types}
							value={types[0].label}
							onChange={
								function (event) {
									let val = generateFromValue(event.target.value as any);
									if(val){
										tempChange(val);
									}
								}
							}
						/>
					) : (
						<div className={styles.customDate}>
							{
								types.map((item) => (
									<div 
										key={item.label} 
										className={`${active === item.value ? 'active' : ''} item`}
										onClick={() => {
											let val = generateFromValue(item.value);
											if(val){
												tempChange(val);
												props.onChange(val);
											}
										}}
									>
										{item.label}
									</div>
								))
							}
						</div>
					)
				}
			</div>
			<div className="footer">
				<Button
					children="Cancel"
					onClick={
						props.onCancel
					}
				/>
				<Button
					children="Apply"
					type="primary"
					disabled={props.disabled && lodash.isEqual(tempvalue, props.value)}
					onClick={
						function () {
							let val = tempvalue;
							if(!tempvalue.endDate){
								let end = new Date(SafeDate(tempvalue.startDate!));
								end.setHours(23,59,59,0)
								val = {
									...tempvalue,
									endDate: format(end)
								};
							}
							props.onChange(val);
						}
					}
				/>
			</div>
		</div>
	)
}

export type RangeDatePickerProps = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	onChange: (val: RangeDatePickerProps["value"]) => void
	cancellable?: boolean
}
export function RangeDatePicker(props: RangeDatePickerProps) {
	const [ref, refMenu, isOpen, setIsOpen] = useToggle({placement: "bottom-start"});
	return (
		<Fragment>
			<div ref={ref} className={`${styles.rangeDatePickerLabel} ${isOpen && 'active'}`}>
				<div className="date-container">
					<i className="icon icon-calendar"/>
					<span className={"value"}><RangeDateLabel startDate={props.value.startDate} endDate={props.value.endDate} /></span>
					{
						props.cancellable &&
						( props.value.startDate || props.value.endDate ) &&
						<i
							className="icon icon-cancel-music"
							onClick={ev => {
								setIsOpen(false);
								props.onChange({
									startDate: null,
									endDate: null
								});
							}}
						/>
					}
				</div>
			</div>
			{
				isOpen && (
					createPortal(
						<div
							className={styles.rangeDatePickerMenu}
							ref={refMenu}
							onClick={
								function (event: any) {
									event.nativeEvent.canceler = (event.nativeEvent.canceler??[]).concat(refMenu.current);
								}
							}
						>
							<RangeDatePickerComponent
								value={props.value}
								onChange={val => {
									props.onChange(val);
									setIsOpen(false);
								}}
								onCancel={() => {
									setIsOpen(false);
								}}
							/>
						</div>,
						window.modals
					)
				)
			}
		</Fragment>
	)
}

export const RangeDateLabel = React.memo<{startDate: string|null, endDate: string|null}>(
	function RangeDateLabel(props) {
		let {startDate, endDate} = props;
		if(!startDate && !endDate){
			return null;
		}
		if(!startDate || !endDate){
			return (
				<Fragment>
					{!startDate && "- "}
					{dateformat(SafeDate((startDate || endDate)!), 'dd mmm yyyy')}
					{!endDate && " -"}
				</Fragment>
			)
		}
		let format = formatRangeDate(startDate, endDate);
		return (
			<Fragment>
				{
					format && (
						<Fragment>
							{dateformat( SafeDate(startDate), format )}
							{" "}-{" "}
						</Fragment>
					)
				}
				{dateformat(SafeDate(endDate), 'dd mmm yyyy')}
			</Fragment>
		)
	},
	(p, np) => ( (p.startDate === np.startDate) && (p.endDate === np.endDate) )
);

function generateFromValue(value: typeof types[number]["value"]){
	let now = new Date();
	now.setHours(0, 0, 0, 0);
	switch(value){
		case 'today':{
			let _now = dateformat(now, frmt);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: _now,
				endDate: dateformat(end, frmt),
			};
			break;
		}
		case 'yesterday':{
			now.setDate(now.getDate() - 1);
			let _now = dateformat(now, frmt);
			let end = new Date(now)
			end.setHours(23, 59, 59, 0);
			return {
				startDate: _now,
				endDate: dateformat(end, frmt)
			};
			break;
		}
		case  'lastSeven':{
			let start = new Date(now);
			start.setDate(start.getDate() - 6);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			};
			break;
		}
		case  'fourteen':{
			let start = new Date(now);
			start.setDate(start.getDate() - 13);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastThiry':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 29);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastSixty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 59)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastNinety':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 89)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastOneEighty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 179)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastYear':{
			let start = new Date();
			start.setHours(0, 0, 0, 0);
			start.setFullYear(start.getFullYear() - 1);
			start.setMonth(0,1);
			let end = new Date();
			end.setMonth(0,1);
			end.setHours(23, 59, 59, 0);
			end.setDate(0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			};
			break;
		}
	}
}

export function formatRangeDate(startDate, endDate){
	let comareFormat = 'dd mmm, yyyy';
		let start = new Date(SafeDate(startDate)), end = new Date(SafeDate(endDate));
		if(start.getFullYear() === end.getFullYear()){
			comareFormat = 'dd mmm';
			if(start.getMonth() === end.getMonth()){
				comareFormat = "dd";
				if(start.getDate() === end.getDate()){
					comareFormat = "";
				}
			}
		}
	return comareFormat;
}

// const DatePickerInput = React.forwardRef<HTMLDivElement, { onChange, value: string | null, displayformat?: string }>(
// 	function (props, ref) {
// 		return (
// 			<InputComponent
// 				{...props}
// 				className={styles.dateInput}
// 				ref={ref}
// 				value={
// 					props.value ?
// 						dateformat(SafeDate(props.value), props.displayformat) :
// 						props.value
// 				}
// 				readOnly
// 				type="text"
// 				leftIcon={<i className="icon-calendar" />}
// 			/>
// 		)
// 	}
// );

// DatePickerComponent.defaultProps = {
// 	// valueFormat:'yyyy-mm-dd HH:MM:ss',
// 	// valueFormat:'yyyy-mm-dd',
// 	displayFormat: 'yyyy-mm-dd',
// }

RangeDatePickerComponent.defaultProps = {
	// valueFormat:'yyyy-mm-dd HH:MM:ss',
	// valueFormat:'yyyy-mm-dd',
	disabled: true,
}

const content = {
  today: 'Today',
  yesterday: 'Yesterday',
  lastSeven: 'Last 7 days',
  lastThiry: 'Last 30 days',
  lastNinety: 'Last 90 days',
  lastYear: 'Last year',
};

export const types = [
	{
		label: content.today,
		value: 'today',
	},
	{
		label: content.yesterday,
		value: 'yesterday',
	},
	{
		label: content.lastSeven,
		value: 'lastSeven',
	},
	{
		label: "Last 14 days",
		value: 'fourteen',
	},
	{
		label: content.lastThiry,
		value: 'lastThiry',
	},
	{
		label: "Last 60 days",
		value: 'lastSixty',
	},
	{
		label: content.lastNinety,
		value: 'lastNinety',
	},
	{
		label: "Last 180 days",
		value: 'lastOneEighty',
	},
	{
		label: content.lastYear,
		value: 'lastYear',
	},
] as const;

function format(date: Date): string {
	return dateformat(SafeDate(date), `yyyy-mm-dd HH:MM:ss`);
}

export function SafeDate(v) {
  return (typeof v === 'string') ? v.replace(/-/g, "/") : v;
}