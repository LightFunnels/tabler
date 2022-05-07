import React from 'react';

type Props = {
	title: string
	actions: React.ReactNode
	subHeader?: React.ReactNode 
	breadcrumbs?: React.ReactNode
}

export function PageHeader(props : Props) {
  return (
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
						<h1 className="page-title">{props.title}</h1>
						{
							props.subHeader && (
								<div className="page-pretitle">{props.subHeader}</div>
							)
						}
					</div>
					{
						props.actions && (
							<div className="col-12 col-md-auto ms-auto d-print-none">
								<div className="btn-list">
									<span className="d-sm-inline">
										{props.actions}
									</span>
								</div>
							</div>
						)
					}
        </div>
      </div>
    </div>
  );
}