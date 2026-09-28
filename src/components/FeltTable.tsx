/**
 * Full-viewport card table: a radial felt gradient with a faint weave and an
 * edge vignette. Purely decorative (aria-hidden), no state, server-renderable.
 */
const FeltTable = () => (
  <div aria-hidden="true" className="felt-canvas fixed inset-0 -z-10">
    <span className="felt-vignette absolute inset-0" />
  </div>
);

export default FeltTable;
