import React, { Component } from 'react'
import TileMap from './TileMap'
import Tile from './Tile'
import MapService from '../services/MapService'
import ZoomController from './ZoomController'
import { EXPRESS_URL, MIN_ZOOM, DELTA_ZOOM, MAX_ZOOM } from '../util/constants'

export default class MapContainer extends Component {
  state = {
    zoom: MIN_ZOOM,
    zoomLevel: 1,
    tilesForZoomLevels: null,
    isLoading: false,
    panClicking: false,
    panPreviousX: null,
    panPreviousY: null
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
      const maxZoomLevel = zoomLevels.length
      if (zoomLevel === maxZoomLevel && zoom === MAX_ZOOM - DELTA_ZOOM) return
    }

    this.setState(
      prevState => ({ zoom: prevState.zoom + DELTA_ZOOM, zoomBackFlag: false }),
      () => {
        const { zoom } = this.state

        if (zoom === MAX_ZOOM) {
          this.setState(prevState => ({
            zoomLevel: prevState.zoomLevel + 1,
            zoom: MIN_ZOOM,
            zoomBackFlag: true
          }))
        }
      }
    )
  }

  handleZoomOut = () => {
    {
      const { zoom, zoomLevel } = this.state
      if (zoomLevel === 1 && zoom === MIN_ZOOM) return
    }

    this.setState(prevState => {
      if (this.state.zoomBackFlag) {
        return {
          zoom: prevState.zoom + DELTA_ZOOM,
          zoomLevel: prevState.zoomLevel - 1,
          zoomBackFlag: false
        }
      } else {
        return { zoom: prevState.zoom - DELTA_ZOOM, zoomBackFlag: true }
      }
    })
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
    const { zoom, zoomLevel, isLoading, tilesForZoomLevels } = this.state
    return (
      <div
        className='container'
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        ref={this.panRef}
      >
        <ZoomController
          onZoomOut={this.handleZoomOut}
          onZoomIn={this.handleZoomIn}
        />
        <TileMap
          zoom={zoom}
          zoomLevel={zoomLevel}
          tiles={tilesForZoomLevels}
          isLoading={isLoading}
        />
      </div>
    )
  }
}
