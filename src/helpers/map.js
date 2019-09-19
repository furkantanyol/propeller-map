const LEVEL_0_THRESHOLD = 100
const LEVEL_1_THRESHOLD = 200
const LEVEL_2_THRESHOLD = 300
const LEVEL_3_THRESHOLD = 400

export function setZoomLevel(zoom) {
  let zoomLevel
  if (zoom < LEVEL_0_THRESHOLD) {
    zoomLevel = 0
  } else if (zoom < LEVEL_1_THRESHOLD) {
    zoomLevel = 1
  } else if (zoom < LEVEL_2_THRESHOLD) {
    zoomLevel = 2
  } else if (zoom < LEVEL_3_THRESHOLD) {
    zoomLevel = 3
  } else {
    zoomLevel = 0
  }

  return zoomLevel
}

export function getColsAndRowsNumber(zoomLevel) {
  return Math.pow(2, zoomLevel) || 1
}
