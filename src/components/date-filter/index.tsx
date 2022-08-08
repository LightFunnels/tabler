import React, {Fragment} from 'react';
import lodash from 'lodash';
import styles from './date-picker.scss';
import dateformat from 'dateformat';
import ReactDatePicker from "react-datepicker";
import { Select } from '../_select';
import { FormGroup, useToggle } from '../form';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import {IconChevronLeft, IconChevronRight, IconCalendarEvent} from "@tabler/icons";

type DateFilterProps = {
	state: StateType;
	onChange: (path: string[], data: any) => void;
	offCard?: boolean;
	noCustom?: boolean;
	hasCompare?: boolean;
	// className?: string;
};

export type StateType = {
	compare_type: string|null
	range: {startDate: string; endDate: string;}
}
export function DateFilter(props: DateFilterProps) {
	const [open, setOpen] = React.useState(false);

	const [ref, refMenu, isOpen, setIsOpen] = useToggle({ placement: 'bottom-end', disabled: open});

	const DateFilter = (
		<RangeDatePicker
			value={props.state.range}
			onChange={range => {
				props.onChange(
					[],
					{
						...props.state,
						range
					}
				);
				setIsOpen(false);
				setOpen(false);
			}}
			onCancel={
				() => {
					setIsOpen(false)
					setOpen(false)
				}
			}
		/>
	)

	return (
		<Fragment>
			<div
			 className={`${styles.dateFilterTogglerContainer} ${props.offCard ? 'offCard' : ''}`}
				onClick={
				 () => {
						if(window.innerWidth < 425){
							setOpen(true)
						}
				 	}
				} 
			>
				<div ref={ref} className={`${styles.dateFilterToggler}`}>
					<IconCalendarEvent />
					<span><RangeDateLabel startDate={props.state.range.startDate} endDate={props.state.range.endDate} /></span>
				</div>
			</div>
			{
				isOpen ? (
					<div
						className={styles.dashboardDateMenu}
						ref={refMenu}
						onClick={
							function (event) {
								event.nativeEvent.canceler = (event.nativeEvent.canceler??[]).concat(refMenu.current);
							}
						}
					>
						{DateFilter}
					</div>
				) : null
			}
		</Fragment>
	)
}

type RangeDatePicker = {
	value:{
		startDate: string|null
		endDate: string|null
	}
	append?: React.ReactNode
	onCancel: () => void
	disabled?: boolean
	onChange: (val: RangeDatePicker["value"]) => void
}

export function RangeDatePicker(props: RangeDatePicker) {

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
			d.setHours(0, 0, 0, 0);
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
		let newValue: RangeDatePicker["value"];
		date.setHours(0, 0, 0, 0);
		if (endDate || !startDate || (tempvalue.startDate && (new Date(SafeDate(tempvalue.startDate)).getTime() > date.getTime()))) {
			newValue = ({
				...tempvalue,
				endDate: null,
				startDate: format(date)
			});
		} else {
			setEndDateHover(null);
			newValue = ({
				...tempvalue,
				endDate: format(date),
			});
		}
		console.log("changeeed")
		tempChange(newValue);
	}

	function dayClassName(now) {

		now.setHours(0, 0, 0, 0);

		let stringNow = dateformat(SafeDate(now), 'yyyy-mm-dd HH:MM:ss');
		let className = `day-${dateformat(SafeDate(now), 'yyyy-mm-dd')} `;
		let nowTime = now.getTime();

		if (
			endDateHover && ((nowTime <= endDateHover) && (nowTime >= startDate!.getTime()))
		) {
			className += ' react-datepicker__day--in-selecting-range ';
		}

		if (dateformat
			(stringNow === tempvalue.startDate) ||
			(stringNow === tempvalue.endDate)
		) {
			className += " edgeRange ";
		} else if ((now > (startDate as Date)) && (now < (endDate as Date))) {
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
											<IconChevronLeft
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
											<IconChevronRight
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
							options={types}
							value={types[0].label}
							onChange={
								function (value) {
									/* let val = generateFromValue(value);
									if(val){
										tempChange(val);
									} */
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
								props.onChange(tempvalue);
							}
						}
					/>
			</div>
		</div>
	)
}
const RangeDateLabel = React.memo<{startDate: string|null, endDate: string|null}>(
	function RangeDateLabel(props) {
		let {startDate, endDate} = props;
		let s = (startDate && new Date(SafeDate(startDate))) as Date,
				e = (endDate && new Date(SafeDate(endDate))) as Date;
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
		return (
			<Fragment>
				{
					(startDate === endDate) ?
						dateformat(SafeDate(startDate), 'dd mmm yyyy') :
						(
							dateformat(SafeDate(startDate), 'dd mmm' + (s!.getFullYear() === e!.getFullYear() ? '' : ', yy')) +
							' - ' +
							dateformat(SafeDate(endDate), 'dd mmm' + (s!.getFullYear() === e!.getFullYear() ? '' : ', yy'))
						)
				}
			</Fragment>
		)
	},
	(p, np) => ( (p.startDate === np.startDate) && (p.endDate === np.endDate) )
);


function SafeDate(v) {
  return (typeof v === 'string') ? v.replace(/-/g, "/") : v;
}
function format(date: Date): string {
	return dateformat(SafeDate(date), `yyyy-mm-dd HH:MM:ss`);
}
function generateFromValue(value: typeof types[number]["value"]){
	let now = new Date();
	now.setHours(0, 0, 0, 0);
	switch(value){
		case 'today':{
			let _now = dateformat(now, 'yyyy-mm-dd HH:MM:ss');
			return {
				startDate: _now,
				endDate: _now,
			};
			break;
		}
		case 'yesterday':{
			now.setDate(now.getDate() - 1);
			let _now = dateformat(now, 'yyyy-mm-dd HH:MM:ss');
			return {
				startDate: _now,
				endDate: _now
			};
			break;
		}
		case  'lastSeven':{
			let start = new Date(now);
			start.setDate(start.getDate() - 6);
			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
			};
			break;
		}
		case  'fourteen':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 13)
			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
			}
			break;
		}
		case  'lastThiry':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 29)
			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
			}
			break;
		}
		case  'lastSixty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 59)
			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
			}
			break;
		}
		case  'lastNinety':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 89)
			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
			}
			break;
		}
		case  'lastOneEighty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 179)
			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(now, 'yyyy-mm-dd HH:MM:ss'),
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
			end.setHours(0, 0, 0, 0);
			end.setDate(0);

			return {
				startDate: dateformat(start, 'yyyy-mm-dd HH:MM:ss'),
				endDate: dateformat(end, 'yyyy-mm-dd HH:MM:ss'),
			};
			break;
		}
	}
}

const content = {
	today: 'Today',
	yesterday: 'Yesterday',
	lastSeven: 'Last 7 days',
	lastThiry: 'Last 30 days',
	lastNinety: 'Last 90 days',
	lastYear: 'Last year',
	previousPeriod: 'Previous period',
	compareToPrev: 'Compare to date',
	compareTolabel: 'Compare to',
}
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

export const compare_to_options = [
	{
		label: content.previousPeriod,
		value: 'previous_period',
	},
	{
		label: content.lastYear,
		value: 'last_year',
	},
];

