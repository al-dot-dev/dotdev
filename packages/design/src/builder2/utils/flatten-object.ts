export function flattenObject<R extends Record<string, unknown>>(object: Record<string, unknown>, prefix = ''): R {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(object)) {
    const name = prefix ? `${prefix}-${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, name))
    } else {
      result[name] = value
    }
  }

  return result as R
}
