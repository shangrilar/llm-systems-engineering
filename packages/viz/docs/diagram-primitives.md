# Values and connections

These additions compose with `Panel`, `cells`, `grid`, `curve`, and `timeline`. They do not change the standard frame or the existing primitives.

- `matrix(panel, x, y, values, options)` draws a rectangular table of explicit numbers or bilingual labels. Row/column labels are optional. It returns the matrix bounds and `cell(row, col)` / `row(row)` bounds. The x/y position is the first cell; reserve space above and left for axis labels. Cell text participates in the existing container QA.
- `port(bounds, side, fraction, gap)` returns a point on a rectangle edge. A positive gap moves it outward so an arrowhead does not cover the border. The fraction is between 0 and 1.
- `connector(panel, from, to, {via, tone, dashed, arrow})` draws an explicitly routed horizontal/vertical connection. Its waypoints must avoid labels and unrelated shapes. Use `curve` for curved links. This function does not claim automatic obstacle avoidance.

For example, route between `port(source, 'right', .5, 6)` and `port(target, 'left', .5, 8)` through a clear vertical lane using two waypoints. Keep the last segment long enough to show the arrowhead. Inspect all language/screen variants after rendering.

The first concrete uses are the per-head KV matrices and independently routed head paths in MHA, the shared KV and numeric query examples in MQA, and the grouped reads in GQA. Matrix axes and cell values also recur in the approved MLA and recurrent-state specifications. Scene-specific labels and computation remain in each figure configuration.
