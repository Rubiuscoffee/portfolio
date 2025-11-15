declare module 'lenis/react' {
  import type { FC, PropsWithChildren } from 'react'
  type Options = unknown
  const ReactLenis: FC<PropsWithChildren<{ root?: boolean; options?: Options }>>
  export default ReactLenis
}
