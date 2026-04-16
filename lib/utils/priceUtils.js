export function calculatePNL(currentPrice, purchasePrice) {
  if (!purchasePrice || purchasePrice === 0) return 0;
  return ((currentPrice - purchasePrice) / purchasePrice) * 100;
}

export function formatETH(value) {
  if (!value) return '0';
  return parseFloat(value).toFixed(4);
}

export function formatUSD(value) {
  if (!value) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value) {
  if (!value) return '0%';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// Estimate purchase price (mock data for MVP)
export function estimatePurchasePrice(floorPrice) {
  // Random multiplier between 0.7 and 1.3 for realistic variation
  const multiplier = 0.7 + Math.random() * 0.6;
  return floorPrice * multiplier;
}
