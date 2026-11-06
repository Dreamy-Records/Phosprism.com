import { defineConfig } from 'astro/config';

const isStaging = process.env.DEPLOY_ENV === 'staging';

export default defineConfig({
  site: isStaging ? 'https://test.phosprism.com' : 'https://phosprism.com',
  base: '/',
  output: 'static',
  image: {
    service: {
      entrypoint: './src/utils/lossless-png-image-service.ts',
    },
  },
});
