export function getContainerSize(size, zoomLevel) {
  return Math.pow(2, zoomLevel) * size
}
