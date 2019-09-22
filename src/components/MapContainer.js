import React, { Component } from 'react'
import TileMap from './TileMap'
import Tile from './Tile'
import MapService from '../services/MapService'
import ZoomController from './ZoomController'
import {
  EXPRESS_URL,
  MIN_ZOOM,
  MAX_ZOOM,
  MIN_TRANSLATE_Z,
  DELTA_TRANSLATE_Z
} from '../util/constants'

export default class MapContainer extends Component {
  state = {
    zoom: MIN_ZOOM,
    zoomLevel: 0,
    translateZ: MIN_TRANSLATE_Z,
    tilesForZoomLevels: null,
    isLoading: false,
    panClicking: false,
    panPreviousX: null,
    panPreviousY: null,
    zoomLevels: null
  }

  panRef = React.createRef()

  async componentDidMount() {
    this.setState({ isLoading: true })
    // Fetch number of zoom levels with respect to number of folders in tiled directory
    // from the express backend
    const zoomLevels = Array.from(
      await MapService.fetchZoomLevels('./assets/tiled')
    )

    // Create tiles for all zoom levels i.e. 1x1 2x2 4x4 8x8
    const tilesForZoomLevels = this.createTilesOfAllSizes(zoomLevels)
    this.setState({ zoomLevels, tilesForZoomLevels, isLoading: false })
  }

  createTilesOfAllSizes = zoomLevels => {
    const tilesForZoomLevels = new Map()
    zoomLevels.forEach(zoomLevel => {
      const zoomLevelNumber = Number(zoomLevel)
      const tiles = this.getTiles(zoomLevelNumber)
      tilesForZoomLevels.set(zoomLevelNumber, tiles)
    })
    return tilesForZoomLevels
  }

  getTileSrc = (zoomLevel, col, row) => {
    // Images are served with express (check server.js)
    const tileSrc = `${EXPRESS_URL}/tiled/${zoomLevel}/${col}/${row}.jpg`
    return tileSrc
  }

  getTiles = zoomLevel => {
    // Map tile images to Tile components
    const cols = Math.pow(2, zoomLevel)
    const rows = Math.pow(2, zoomLevel)
    let tiles = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let tileSrc = this.getTileSrc(zoomLevel, col, row)
        tiles.push(
          <Tile key={tileSrc} src={tileSrc} colIndex={col} rowIndex={row} />
        )
      }
    }

    return tiles
  }

  // ZOOM HANDLERS
  handleZoomIn = () => {
    {
      const { zoom, zoomLevel, zoomLevels } = this.state
      const maxZoomLevel = zoomLevels.length - 1
      if (zoomLevel === maxZoomLevel && zoom === MAX_ZOOM) return
    }

    this.setState(
      prevState => ({
        zoom: prevState.zoom + 1,
        translateZ: prevState.translateZ + DELTA_TRANSLATE_Z
      }),
      () => {
        const { zoom } = this.state
        if (zoom % 2 === 0) {
          this.setState(prevState => ({
            zoomLevel: prevState.zoomLevel + 1,
            translateZ: MIN_TRANSLATE_Z
          }))
        }
      }
    )
  }

  handleZoomOut = () => {
    {
      const { zoom, zoomLevel, translateZ } = this.state
      if (zoomLevel === 0 && translateZ === 0 && zoom === 0) return
    }
    this.setState(
      prevState => ({
        zoom: prevState.zoom - 1
      }),
      () => {
        const { zoom } = this.state

        this.setState(prevState => {
          if (zoom % 2 === 0) {
            return {
              translateZ: prevState.translateZ - DELTA_TRANSLATE_Z
            }
          } else {
            return {
              zoomLevel: prevState.zoomLevel - 1,
              translateZ: prevState.translateZ + DELTA_TRANSLATE_Z
            }
          }
        })
      }
    )
  }

  // PAN HANDLERS
  handleMouseDown = e => {
    e.preventDefault()

    this.setState({
      clicking: true,
      panPreviousX: e.clientX,
      panPreviousY: e.clientY
    })
  }

  handleMouseUp = () => {
    this.setState({
      clicking: false
    })
  }

  handleMouseMove = e => {
    const { clicking, panPreviousX, panPreviousY } = this.state
    if (clicking) {
      e.preventDefault()
      const panElement = this.panRef.current
      panElement.scrollLeft += panPreviousX - e.clientX
      panElement.scrollTop += panPreviousY - e.clientY

      this.setState({
        panPreviousX: e.clientX,
        panPreviousY: e.clientY
      })
    }
  }

  handleMouseLeave = () => {
    this.setState({
      clicking: false
    })
  }

  render() {
    const {
      zoom,
      zoomLevel,
      isLoading,
      tilesForZoomLevels,
      translateZ
    } = this.state
    return (
      <React.Fragment>
        <ZoomController
          onZoomOut={this.handleZoomOut}
          onZoomIn={this.handleZoomIn}
        />
        <div
          className='container'
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={this.panRef}
        >
          <TileMap
            onDoubleClick={this.handleZoomIn}
            zoom={zoom}
            translateZ={translateZ}
            zoomLevel={zoomLevel}
            tiles={tilesForZoomLevels}
            isLoading={isLoading}
          />
        </div>
      </React.Fragment>
    )
  }
}
