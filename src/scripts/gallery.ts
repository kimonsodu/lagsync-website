/**
 * Shared, dependency-free gallery primitives used by Screenshots + PromoRotator.
 * No global scope pollution — both classes are scoped modules instantiated per-root.
 */

export interface GalleryItem {
  src: string;
  alt?: string;
  caption?: string;
  link?: string;
}

/** Read JSON payload off a root element's data attribute (set server-side by Astro). */
export function readItems(root: HTMLElement, attr: string): GalleryItem[] {
  const raw = root.dataset[attr];
  if (!raw) return [];
  try {
    return JSON.parse(raw) as GalleryItem[];
  } catch {
    return [];
  }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Fullscreen lightbox with prev/next, keyboard nav and backdrop close.
 * Triggers are any elements inside `triggerScope` carrying [data-lightbox-index].
 */
export class Lightbox {
  private index = 0;
  private readonly root: HTMLElement;
  private readonly img: HTMLImageElement;
  private readonly cap: HTMLElement;

  constructor(
    private readonly items: GalleryItem[],
    opts: {
      root: HTMLElement;
      img: HTMLImageElement;
      caption: HTMLElement;
      triggerScope: ParentNode;
      prevBtn?: HTMLElement | null;
      nextBtn?: HTMLElement | null;
      closeBtn?: HTMLElement | null;
    }
  ) {
    this.root = opts.root;
    this.img = opts.img;
    this.cap = opts.caption;

    opts.triggerScope
      .querySelectorAll<HTMLElement>('[data-lightbox-index]')
      .forEach((el) =>
        el.addEventListener('click', () =>
          this.open(Number(el.dataset.lightboxIndex) || 0)
        )
      );

    opts.prevBtn?.addEventListener('click', () => this.step(-1));
    opts.nextBtn?.addEventListener('click', () => this.step(1));
    opts.closeBtn?.addEventListener('click', () => this.close());

    this.root.addEventListener('click', (e) => {
      if (e.target === this.root) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (this.root.classList.contains('hidden')) return;
      if (e.key === 'Escape') this.close();
      else if (e.key === 'ArrowLeft') this.step(-1);
      else if (e.key === 'ArrowRight') this.step(1);
    });
  }

  open(i: number) {
    const item = this.items[i];
    if (!item) return;
    this.index = i;
    this.img.src = item.src;
    this.img.alt = item.alt ?? '';
    this.cap.textContent = item.caption ?? '';
    this.root.classList.remove('hidden');
    this.root.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.root.classList.add('hidden');
    this.root.classList.remove('flex');
    document.body.style.overflow = '';
  }

  private step(delta: number) {
    const n = this.items.length;
    if (!n) return;
    this.open((this.index + delta + n) % n);
  }
}

/**
 * Auto-rotating image carousel with prev/next, hover-pause and a single
 * swapped <img>. Respects prefers-reduced-motion (no auto-advance).
 */
export class Carousel {
  private index = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly slides: GalleryItem[],
    private readonly opts: {
      img: HTMLImageElement;
      caption: HTMLElement;
      link: HTMLAnchorElement;
      prevBtn?: HTMLElement | null;
      nextBtn?: HTMLElement | null;
      hoverTarget?: HTMLElement | null;
      intervalMs?: number;
    }
  ) {
    if (!slides.length) return;

    opts.prevBtn?.addEventListener('click', () => {
      this.step(-1);
      this.restart();
    });
    opts.nextBtn?.addEventListener('click', () => {
      this.step(1);
      this.restart();
    });

    if (opts.hoverTarget) {
      opts.hoverTarget.addEventListener('mouseenter', () => this.stop());
      opts.hoverTarget.addEventListener('mouseleave', () => this.start());
    }

    this.render();
    this.start();
  }

  private render() {
    const s = this.slides[this.index];
    if (!s) return;
    this.opts.img.src = s.src;
    this.opts.img.alt = s.alt ?? '';
    this.opts.caption.textContent = s.caption ?? '';
    this.opts.link.href = s.link ?? s.src;
  }

  private step(delta: number) {
    const n = this.slides.length;
    this.index = (this.index + delta + n) % n;
    this.render();
  }

  private start() {
    if (prefersReducedMotion() || this.slides.length < 2) return;
    this.stop();
    this.timer = setInterval(() => this.step(1), this.opts.intervalMs ?? 5000);
  }

  private stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private restart() {
    this.stop();
    this.start();
  }
}
