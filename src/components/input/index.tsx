import React from 'react';

type Props = {
  className?: string
  loading?: boolean
}

export function Input({className, loading, ...props} : Props & React.InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className={`input-icon ${className ?? ""}`}>
      {
	      loading && (
	        <span className="input-icon-addon">
	          <div className="spinner-border spinner-border-sm text-muted" role="status"></div>
	        </span>
	      )
	    }
      <input 
        {...props}
        className={'form-control'} 
        type='text'    
      />
    </div>
  )
}

//validation
{/* <div class="mb-3">
  <label class="form-label">Validation States </label>
  <input type="text" class="form-control is-valid mb-2" placeholder="Valid State..">
  <input type="text" class="form-control is-invalid" placeholder="Invalid State..">
  <div class="invalid-feedback">Invalid feedback</div>
</div> */}