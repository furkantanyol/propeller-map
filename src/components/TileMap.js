import React from 'react'
import PropTypes from 'prop-types'
import './TileMap.css'
import Loading from './Loading'

export default function TileMap({
  translateZ,
  zoomLevel,
  tiles,
  isLoading,
  onDoubleClick
}) {
  const children = []

  if (tiles && !isLoading) {
    // Create tiles wrappers when Map Type tiles is loaded and handle zoomLevel change
    tiles.forEach((value, key) => {
      children.push(
        <div
          key={key}
          className={`tiles ${zoomLevel === key ? 'tiles-active' : ''}`}
        >
          {value}
        </div>
      )
    })
  }

  if (isLoading || !tiles) return <Loading />

  return (
    <div
      style={{
        transform: `translate3d(-50%, -50%, ${translateZ}px)`
      }}
      className='tiles-wrapper'
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  )
}

TileMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
}
