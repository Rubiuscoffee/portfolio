/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler para optimización automática (estable en Next.js 16)
  reactCompiler: true,
  
  experimental: {
    // Habilitar filesystem caching de Turbopack para desarrollo más rápido
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
