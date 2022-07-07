import React from 'react';

type Props = {
	title: string
	actions?: React.ReactNode
	subHeader?: React.ReactNode 
	breadcrumbs?: React.ReactNode
}
import styles from './page-header.scss';

export function PageHeader(props : Props) {
  return (
		<div className={styles.pageHeader}>				
			<div className="container-xl">
				<div className="page-header mt-5 mb-4">
					<div className="row g-2 align-items-center">
						{
							props.breadcrumbs && (
								<ol className="breadcrumb">
									{props.breadcrumbs}
								</ol>
							)
						}
						<div className="col">
							{
								props.subHeader && (
									<div className="page-pretitle">{props.subHeader}</div>
								)
							}
							<h1 className="page-title">{props.title}</h1>
						</div>
						{
							props.actions && (
								<div className="col-12 col-md-auto ms-auto d-print-none">
									<div className="btn-list">
										<span className="d-flex align-items-center">
											{props.actions}
										</span>
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
  );
}