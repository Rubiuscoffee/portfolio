/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler para optimización automática (estable en Next.js 16)
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    // Habilitar filesystem caching de Turbopack para desarrollo más rápido
    turbopackFileSystemCacheForDev: true,
    // Habilitar View Transitions experimentales integradas en React/Next
    viewTransition: true,
  },
};

export default nextConfig;
