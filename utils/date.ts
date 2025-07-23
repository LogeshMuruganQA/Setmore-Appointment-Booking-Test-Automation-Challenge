// Get date string in YYYY-MM-DD format
export function getDateOffsetByDays(offset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
}

// Get time string in HH:MM format
export function getTimeOffsetByHours(offset: number): string {
    const time = new Date();
    time.setHours(time.getHours() + offset);
    return time.toTimeString().split(':').slice(0, 2).join(':');
}

export function getRandomFutureDate(daysAhead: number = 10): string {
  const randomOffset = Math.floor(Math.random() * daysAhead) + 1; // 1 to daysAhead
  const date = new Date();
  date.setDate(date.getDate() + randomOffset);
  return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
}
