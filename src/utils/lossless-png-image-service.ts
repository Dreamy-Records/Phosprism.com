import sharp from 'sharp';
import sharpImageService from 'astro/assets/services/sharp';

const qualityPresets = {
  low: 25,
  mid: 50,
  high: 80,
  max: 100,
} as const;

const parseQuality = (quality: string | null | undefined) => {
  if (!quality) return undefined;

  const numericQuality = Number.parseInt(quality, 10);
  if (!Number.isNaN(numericQuality)) return numericQuality;
  return quality in qualityPresets
    ? qualityPresets[quality as keyof typeof qualityPresets]
    : undefined;
};

const losslessPngImageService: typeof sharpImageService = {
  ...sharpImageService,
  async transform(inputBuffer, transform, imageConfig) {
    if (transform.format !== 'webp') {
      return sharpImageService.transform(inputBuffer, transform, imageConfig);
    }

    const image = sharp(inputBuffer, { failOnError: false, pages: -1 });
    const metadata = await image.metadata();

    // PNGは可逆WebPへ変換し、アートワークやロゴの細部を劣化させない。
    // ただし品質を95未満に指定した画像（大きな背景画像など）は通常の非可逆WebPにする。
    const quality = parseQuality(transform.quality);
    if (metadata.format !== 'png' || (quality !== undefined && quality < 95)) {
      return sharpImageService.transform(inputBuffer, transform, imageConfig);
    }

    image.rotate();

    if (transform.width && transform.height && transform.fit) {
      image.resize({
        width: Math.round(transform.width),
        height: Math.round(transform.height),
        fit: transform.fit,
        position: transform.position,
        withoutEnlargement: true,
      });
    } else if (transform.height && !transform.width) {
      image.resize({ height: Math.round(transform.height), withoutEnlargement: true });
    } else if (transform.width) {
      image.resize({ width: Math.round(transform.width), withoutEnlargement: true });
    }

    if (transform.background) image.flatten({ background: transform.background });

    const { data, info } = await image
      .webp({ lossless: true, effort: 6, alphaQuality: 100, quality })
      .toBuffer({ resolveWithObject: true });

    return { data: new Uint8Array(data), format: info.format };
  },
};

export default losslessPngImageService;
