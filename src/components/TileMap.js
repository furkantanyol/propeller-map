import React from 'react'
import PropTypes from 'prop-types'
import { getContainerSize } from '../util/helpers'
import './TileMap.css'
import Loading from './Loading'
import { TILE_LENGTH } from '../util/constants'

export default function TileMap({ zoom, zoomLevel, tiles, isLoading }) {
  const children = []
  if (tiles && !isLoading) {
    // Create tiles wrappers when Map Type tiles is loaded and handle zoomLevel change
    tiles.forEach((value, key) => {
      children.push(
        <div
          key={key}
          className={`tiles ${zoomLevel - 1 === key ? 'tiles-active' : ''}`}
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
        width: `${getContainerSize(TILE_LENGTH, zoomLevel - 1)}px`,
        height: `${getContainerSize(TILE_LENGTH, zoomLevel - 1)}px`,
        transform: `scale(${zoom})`
      }}
      className='tiles-wrapper'
    >
      {children}
    </div>
  )
}

TileMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
}
