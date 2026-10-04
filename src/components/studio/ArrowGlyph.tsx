/** Preserve desktop typography; phone CSS draws the arrow without an emoji font. */
export function ArrowGlyph() {
  return <span className="phone-arrow-glyph notranslate" translate="no" aria-hidden="true">↗</span>;
}
