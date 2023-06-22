import { useMemo, type DependencyList } from 'react'

export const useMemoAsync = <T extends Function>(
  callback: T,
  depsOrErr?: DependencyList | ((err: any) => void),
  deps?: DependencyList
): T => {
  const depArr: DependencyList = useMemo(() => {
    let _deps: DependencyList = []
    if (Array.isArray(depsOrErr)) {
      _deps = [..._deps, ...depsOrErr]
    }
    if (Array.isArray(deps)) {
      _deps = [..._deps, ...deps]
    }
    return _deps
  }, [depsOrErr, deps])

  const hook = useMemo<any>(
    () =>
      async (...args: any[]) => {
        try {
          return await callback(...args)
        } catch (err) {
          if (typeof depsOrErr === 'function') {
            depsOrErr(err)
          } else {
            console.error('useMemo', err)
          }
        }
      },
    depArr
  )

  return hook
}
