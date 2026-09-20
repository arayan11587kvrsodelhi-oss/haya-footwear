/**
 * GENERATED FILE — do not edit by hand.
 * Produced by `node scripts/optimize-images.mjs` from public/images/*.png.
 *
 * `lqip` is a ~20px inline WebP used as a blur-up placeholder so imagery paints
 * instantly (no layout shift, no empty boxes) while the full variant decodes.
 */
export type ImageAsset = {
  width: number;
  height: number;
  widths: number[];
  lqip: string;
};

export const IMAGES: Record<string, ImageAsset> = {
  "detail-knit": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADwAwCdASoUAAsAPxl0sVCspqSisAgBkCMJYgC7AYuab8DyT78EZ8AAAP6Qo5Bikgr2bsK8LxnYYT0/RPN3DqinPaNxGIn1b2Oe+aPF32GyjlKk6PJmvsWWY+2tIemQ3UFMh4L/jnFcbKdymzqclwOeer1DYlMv6shfdSAA"
  },
  "detail-sole": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJZQC/OBnvyWhvwbntn0AA/dJiEKC/18MOCuo2M7CyLjhCOLnhr1/LTldZ+Q/hJ4P3CBWYOtyf7wAA"
  },
  "editorial": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAABwAwCdASoUAAsAPxl2slCspySisAgBkCMJQBadAa9FxGScfiAA/FpWM7Ck44py/0Ujn3dQppsMJgnOyd/dsNaH7kcUVdEvb0GrgIuggwMWbAAA"
  },
  "hero-shoe": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAACQAwCdASoUAAsAPxl2slEspySyMAgCQCMJZQCuHCHw9DnaulwAAP7TUXmqk0GUGIAr9FofHbCNqAAA"
  },
  "lifestyle": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAQBACdASoUAAsAPxl0sVCspqSisAgBkCMJQBOiP/wEtpZ7a+ZO4SCMAAD9GaQCpXQ4MIuyOH1wVAreSbCC8+qoOrcGEJATFJiVjRB8iI+B3cadRvPm4fojJgOmSItjo/hPkAfvo87nCg/bgAijadK9f4/618WPpGaSLXaRkAAAAA=="
  },
  "shoe-bone": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAgCdASoUAAsAPxl2slCspySuMAgBwCMJZwDE2DKUAAD+7bnifd9R6mBKm9r5ohP5MAAA"
  },
  "shoe-ember": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABQAwCdASoUAAsAPxl0sVCspqSisAgBkCMJYwCdACHgVK4vQAD+00pWRyGV99Dx9QWpSRXkDt1KAaTELRyPjtrlo9IfkAAA"
  },
  "shoe-onyx": {
    "width": 1408,
    "height": 768,
    "widths": [
      640,
      1024,
      1408
    ],
    "lqip": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAwCdASoUAAsAPxl2slEspySusAgB0CMJZwAAXech/gTMIgwAAP7et5PdR6CV6a6uqtq9Nu4ujnx2bCWcJkzdd3qiuHxvePCQwAAA"
  }
} as const;

export function pickAsset(name: keyof typeof IMAGES): ImageAsset {
  return IMAGES[name];
}
