import {memoryUsage} from 'node:process';

export function getStatistics() {
  const bytes = memoryUsage().external;
  const mega_bytes = bytes / 1024 / 1024;
  return mega_bytes;
}

export function getMemUsageAverage(arr) {
  const avg = arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
  return `${avg.toFixed(2)}MBs of RAM`;
}
