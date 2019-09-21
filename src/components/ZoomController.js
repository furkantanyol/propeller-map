import React from 'react'
import './ZoomController.css'

export default function ZoomController({ onZoomIn, onZoomOut }) {
  return (
    <div className='zoom-controller-wrapper'>
      <div
        className='zoom-controller-button zoom-controller-increase'
        onClick={onZoomIn}
      >
        +
      </div>
      <div
        className='zoom-controller-button zoom-controller-decrease'
        onClick={onZoomOut}
      >
        -
      </div>
    </div>
  )
}
