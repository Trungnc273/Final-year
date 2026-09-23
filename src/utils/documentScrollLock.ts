let lockCount = 0;
let restoreDocument: (() => void) | null = null;

/** Locks the page, including touch scrolling in iOS Safari, without losing its position. */
export function lockDocumentScroll(): () => void {
  if (lockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');
    const savedY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      rootOverflow: root?.style.overflow ?? '',
    };

    html.style.scrollBehavior = 'auto';
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${savedY}px`;
    body.style.width = '100%';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    if (root) root.style.overflow = 'hidden';

    restoreDocument = () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;
      if (root) root.style.overflow = previous.rootOverflow;
      window.scrollTo(0, savedY);
      html.style.scrollBehavior = previous.htmlScrollBehavior;
    };
  }

  lockCount++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount--;
    if (lockCount === 0) {
      restoreDocument?.();
      restoreDocument = null;
    }
  };
}
