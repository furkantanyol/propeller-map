import React from 'react'
import PropTypes from 'prop-types'
import './Loading.css'

export default function Loading({ loading, width, height }) {
  return loading ? (
    <div className='spinner-wrapper'>
      <svg
        className='loader'
        width={width}
        height={height}
        viewBox='0 0 66 66'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          className='path'
          fill='none'
          strokeWidth='2'
          strokeLinecap='round'
          cx='33'
          cy='33'
          r='30'
        />
      </svg>
    </div>
  ) : null
}

Loading.propTypes = {
  loading: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
}
Loading.defaultProps = {
  loading: true,
  width: 65,
  height: 65
}
