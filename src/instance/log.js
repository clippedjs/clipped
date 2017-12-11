export function initLog (Clipped: Object) {
  Clipped.prototype.print = console.log

  return Clipped
}
