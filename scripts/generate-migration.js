import { build } from 'esbuild';
import { rimraf } from 'rimraf';
import { spawnSync } from 'node:child_process';

await build({
  platform: 'node',
  minify: false,
  format: 'cjs',
  outdir: 'dist/migrations',
  entryPoints: ['src/schema.ts'],
  packages: 'external',
  plugins: [
    {
      name: 'rimraf',
      setup: (build) => {
        build.onStart(async () => {
          await rimraf('dist/migrations');
        });
      },
    },
  ],
});

spawnSync('npm', ['run', 'migration:generate:drizzle'], {
  shell: true,
  stdio: 'inherit',
});
