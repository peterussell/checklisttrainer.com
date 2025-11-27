export function calculatePercentage(numerator: number, denominator: number): number {
  if (!numerator || !denominator) return 0;
  return Math.round((numerator / denominator) * 100);
}
