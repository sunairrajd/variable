export const isBrowser = typeof window !== 'undefined'

export function safelyAccessWindow<T>(accessor: () => T, fallback: T): T {
  if (isBrowser) {
    try {
      return accessor()
    } catch (e) {
      console.error('Error accessing window property', e)
      return fallback
    }
  }
  return fallback
} 