export const ROW_HEIGHT = 400;
export const LEFT_X = 35;
export const RIGHT_X = 65;

export function buildSerpentinePath(moduleCount: number): string {
  if (moduleCount === 0) return "";

  // Start directly at node 0
  const firstX = LEFT_X;
  const firstY = ROW_HEIGHT * 0.5;
  let d = `M ${firstX} ${firstY}`;

  for (let i = 1; i < moduleCount; i++) {
    const nodeY = ROW_HEIGHT * 0.5 + i * ROW_HEIGHT;
    const nodeX = i % 2 === 0 ? LEFT_X : RIGHT_X;
    const prevNodeX = i % 2 === 0 ? RIGHT_X : LEFT_X;
    const prevNodeY = ROW_HEIGHT * 0.5 + (i - 1) * ROW_HEIGHT;

    const cp1X = prevNodeX;
    const cp1Y = prevNodeY + (nodeY - prevNodeY) * 0.5;
    const cp2X = nodeX;
    const cp2Y = nodeY - (nodeY - prevNodeY) * 0.5;

    d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nodeX} ${nodeY}`;
  }

  return d;
}

export function buildSerpentinePathFromPositions(positions: { x: number; y: number }[]): string {
  if (positions.length === 0) return "";
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const cp1X = prev.x;
    const cp1Y = prev.y + (curr.y - prev.y) * 0.5;
    const cp2X = curr.x;
    const cp2Y = curr.y - (curr.y - prev.y) * 0.5;
    d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
  }
  return d;
}
