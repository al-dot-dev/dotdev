import { ref, watchEffect } from 'vue'
import { useGlobalEvent } from './useGlobalEvent.ts'

export function useMediaQuery(query: string) {
  const matches = ref(false)

  let mediaQuery: MediaQueryList | undefined

  const update = () => {
    matches.value = mediaQuery?.matches ?? false
  }

  watchEffect(() => {
    mediaQuery = window.matchMedia(query)
    update()
  })

  useGlobalEvent('change', update, {
    target: mediaQuery,
  })

  return matches
}
