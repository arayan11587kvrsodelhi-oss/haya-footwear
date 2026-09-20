import type Lenis from "lenis";

/**
 * The smooth-scroll instance is created once in `App` and exposed on `window`
 * so components that need to pause/resume scrolling (the mobile menu) can
 * reach it without prop-drilling or a context provider.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
    /**
     * Optional anchor-scroll helper installed by App. Uses Lenis when smooth
     * scrolling is active, and falls back to native `scrollIntoView` for
     * reduced-motion users, where Lenis is never created.
     */
    __scrollToHash?: (hash: string) => void;
  }
}

export { };
