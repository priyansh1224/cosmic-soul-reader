// ═══════════════════════════════════════════════════════════════════
// 👁️ INTERSECTION OBSERVER HOOK
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState, useCallback } from 'react'

const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options

  const elementRef = useRef(null)
  const [entry, setEntry] = useState(null)
  const frozen = useRef(false)

  const updateEntry = useCallback(([newEntry]) => {
    if (frozen.current) return
    setEntry(newEntry)
    if (freezeOnceVisible && newEntry.isIntersecting) {
      frozen.current = true
    }
  }, [freezeOnceVisible])

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport) {
      // Fallback: assume visible
      setEntry({ isIntersecting: true, intersectionRatio: 1 })
      return
    }

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, updateEntry])

  return {
    ref: elementRef,
    entry,
    isVisible: !!entry?.isIntersecting,
    ratio: entry?.intersectionRatio || 0,
  }
}

export default useIntersectionObserver