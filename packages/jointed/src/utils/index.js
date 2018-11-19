function isConstructor (f) {
  try {
    Reflect.construct(String, [], f)
  } catch (e) {
    return false
  }
  return true
}

exports.isConstructor = isConstructor
