import React from 'react'
import PropTypes from 'prop-types'
import { TILE_LENGTH } from '../util/constants'

export default function Tile({ src, colIndex, rowIndex }) {
  return (
    <img
      style={{
        position: 'absolute',
        left: `${colIndex > 0 ? colIndex * TILE_LENGTH : 0}px`,
        top: `${rowIndex > 0 ? rowIndex * TILE_LENGTH : 0}px`
      }}
      src={src}
      alt='tile'
    />
  )
}

Tile.propTypes = {
  src: PropTypes.string.isRequired,
  colIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired
}
