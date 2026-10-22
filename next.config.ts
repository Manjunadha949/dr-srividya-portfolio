import type {NextConfig} from 'next';
import path from 'node:path';
const nextConfig:NextConfig={
  poweredByHeader:false,
  webpack(config,{webpack}){
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(
      /(^|[/\\])runtime-env(?:\.ts)?$/,
      path.resolve(process.cwd(),'lib/runtime-env.vercel.ts'),
    ));
    return config;
  },
};
export default nextConfig;
