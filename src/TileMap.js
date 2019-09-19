import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setZoomLevel, getColsAndRowsNumber } from './helpers/map'

export default class TileMap extends Component {
  static propTypes = {
    zoom: PropTypes.number.isRequired
  }

  state = {
    zoomLevel: setZoomLevel(this.props.zoom) || 0,
    cols: getColsAndRowsNumber(this.zoomLevel),
    rows: getColsAndRowsNumber(this.zoomLevel)
  }

  getTileSrc = (col, row) => {
    const { zoomLevel } = this.state
    const tileSrc = `./assets/tiled/${zoomLevel}/${col}/${row}.jpg`
    return tileSrc
  }

  getTiles = () => {
    const { rows, cols, zoomLevel } = this.state
    let tiles = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let tileSrc = this.getTileSrc(col, row)
        tiles.push(<Tile key={tileSrc} src={tileSrc} zoomLevel={zoomLevel} />)
      }
    }

    return tiles
  }

  // updateTiles(zoomLevel, cols, rows) {
  //   if (this.zoomLevel === zoomLevel) {
  //   }
  // }

  render() {
    const { zoomLevel } = this.state
    const tiles = this.getTiles()
    debugger
    return (
      <div className='map-container' id='map-container'>
        <div
          className={`tiles-wrapper ${zoomLevel === 3 ? 'zoom-level-3' : ''}`}
        >
          {tiles}
        </div>
      </div>
    )
  }
}

const Tile = ({ key, src, zoomLevel }) => {
  debugger
  return (
    <img key={key} src={src} className={`tile-zl-${zoomLevel}`} alt='tile' />
  )
}
