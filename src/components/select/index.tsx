import React, {Suspense} from "react";
import {
	usePaginationFragment,
	usePreloadedQuery,
	useRelayEnvironment,
	loadQuery,
	GraphQLTaggedNode,
} from "react-relay";
import {createPopper, Instance} from "@popperjs/core";
import "./select.scss";
import DataLoader from "dataloader";

const first = 20;

type F<Type> = {
	value: Type|null
	onChange: (a: Type|null) => void
}

export type Props = {
	query: GraphQLTaggedNode
	fragment: GraphQLTaggedNode
	error?: string
	label?: string
	cancellable?: boolean
	loader?: DataLoader<any, any>
	additionalVariables?: {}
} & (
	F<string>|F<number>
)

export function AsyncSelect(props: Props){

	const [query, sq] = React.useState("");
	const env = useRelayEnvironment();
	const [open, setOpen] = React.useState(false);
	const [loaded, setLoaded] = React.useState<any>(null);

	const preloadedQuery = React.useMemo(
		() => {
			return loadQuery(env, props.query, { query, first, ...props.additionalVariables });
		},
		[]
	);

	const ref = React.useRef<HTMLDivElement>(null);
	const menuRef = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const refInit = React.useState

	React.useLayoutEffect(() => {

		if(!open) return;

		inputRef.current!.focus();

		function click(event){
			if(event.target === inputRef.current) return;
			setOpen(false);
		}

		let tm = setTimeout(() => {
			document.addEventListener("click", click)
		});

		const p = createPopper(
			ref.current!,
			menuRef.current!,
			{
				modifiers:[
					{
						name: "offset",
						options:{
							offset: [0, 10],
						}
					}
				]
			}
		);

		return () => {
			p.destroy();
			clearTimeout(tm);
			document.removeEventListener("click", click)
		}

	}, [open]);

	// to update this later when u usethis compo in other places
	React.useEffect(() => {
		if(props.value){
			// w'll throw error here if not passed
			if(props.loader){
				props.loader.load(props.value).then(setLoaded)
			} else {
				throw new Error("missing loader");
			}
		} else if (loaded){
			setLoaded(null);
		}
	}, [props.value]);

	return (
		<div>
			<div
				ref={ref}
				className={
					"form-select " +
					(props.error ? "is-invalid" : "") +
					(props.cancellable ? " cancellable" : "")
					}
				>
				<div
					className="ts-control"
					onClick={() => {
						setOpen(!open);
					}}
				>
				  <div className="item" >
				  	{
				  		loaded ?
				  			loaded.label :
				  			props.label ?? "Select"
				  	}
				  </div>
				  {/*<input placeholder="Select a date" />*/}
				</div>
			  {
			  	props.cancellable &&
			  	props.value &&
			  	(
			  		<i
			  			className="ti x-icon ti-x cursor-pointer"
			  			onClick={() => {
			  				props.onChange(null);
			  			}}
			  		/>
			  	)
			  }
				{
					open && 
					<div ref={menuRef} className="dropdown-menu lf-list">
						<input
							ref={inputRef}
							className="select-input-search"
							value={query}
							placeholder="Type Something ..."
							onChange={event => {
								sq(event.target.value);
							}}
						/>
						<Suspense
							fallback={<LoadingWrapper />}
						>
							<Content
								q={query}
								value={props.value}
								onChange={value => {
									setOpen(false);
									props.onChange(value);
								}}
								query={props.query}
								preloadedQuery={preloadedQuery}
								fragment={props.fragment}
							/>
						</Suspense>
					</div>
				}
			</div>
			{
				props.error && (
					<div className="invalid-feedback">{props.error}</div>
				)
			}
		</div>
	)
}

type CProps = {
	query: GraphQLTaggedNode
	preloadedQuery
	fragment: GraphQLTaggedNode
	onChange: Props["onChange"]
	value: Props["value"]
	q: string
	// menuRef
}

function Content(props: CProps){
	const resp = usePreloadedQuery<any>(props.query, props.preloadedQuery);
	const refInit = React.useRef(true);
	const {
		hasNext,
		data,
		isLoadingNext,
		loadNext,
		refetch
	} = usePaginationFragment(props.fragment, resp);
	React.useEffect(() => {
		if(refInit.current){
			refInit.current = false;
			return;
		}
		refetch({
			query: props.q
		});
	}, [props.q]);
	return (
		<div
			className="ts-dropdown-content"
			onScroll={
				hasNext ?
				(event: any) => {
					if(isLoadingNext){
						return;
					}
					if((event.target.offsetHeight + event.target.scrollTop) >= (event.target.scrollHeight - 3)){
						loadNext(first);
				  }
				} : undefined
			}
			>
			{
				(data.pagination.edges.length === 0) && (
					<div className="text-muted text-center">No Items Were Found</div>
				)
			}
			{
				data.pagination.edges.map(edge => {
					const node = edge!.node!;
					return (
		  			<div
		  				onClick={e => {
		  					props.onChange(node.value);
		  				}}
		  				key={node.value}
		  				className={"dropdown-item " + (props.value === node.value ? "active" : "")} >{node.label}</div>
					)
				})
			}
			{
				isLoadingNext && <LoadingWrapper />
			}
		</div>
	)
}

function LoadingWrapper(){
	return (
		<div className="text-center">
			<div className="spinner-border" ></div>
		</div>
	)
}