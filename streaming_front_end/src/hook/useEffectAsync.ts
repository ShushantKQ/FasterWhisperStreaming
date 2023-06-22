import { useEffect, useMemo, type DependencyList } from 'react'
import type { Destructor } from './types'

export const useEffectAsync = (
  effect: () => Promise<void>,
  depsOrDes?: DependencyList | Destructor | null,
  depsOrErr?: DependencyList | ((err: any) => void),
  deps?: DependencyList
) => {
  const depArr = useMemo(() => {
    let _deps: DependencyList = []
    if (Array.isArray(depsOrDes)) {
      _deps = [..._deps, ...depsOrDes]
    }
    if (Array.isArray(depsOrErr)) {
      _deps = [..._deps, ...depsOrErr]
    }
    if (Array.isArray(deps)) {
      _deps = [..._deps, ...deps]
    }
    return _deps
  }, [deps, depsOrDes, depsOrErr])

  const hook = useEffect(() => {
    ;(async () => {
      try {
        await effect()
      } catch (err) {
        if (typeof depsOrErr === 'function') {
          depsOrErr(err)
        } else {
          console.info(err)
        }
      }
    })()

    return () => {
      if (typeof depsOrDes === 'function') {
        depsOrDes()
      }
    }
  }, depArr)

  return hook
}
