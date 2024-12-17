// if yesterday, return 'Yesterday, HH:MM'
// if this hour, return 'HH:MM'
// if this minute, return 'Just now'
// if today, return 'HH:MM'
// if this month, return 'DD.MM HH:MM'
// if this year, return 'DD.MM.YYYY HH:MM'

export const normalizeDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const now = new Date();
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours === nowHours && minutes === nowMinutes) {
    return 'Just now';
  }

  if (hours === nowHours && minutes < nowMinutes) {
    const diff = nowMinutes - minutes;
    return diff === 1 ? '1 minute ago' : `${diff} minutes ago`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${pad(hours)}:${pad(minutes)}`;
  }

  if (date.toDateString() === today.toDateString()) {
    return `${pad(hours)}:${pad(minutes)}`;
  }

  if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    return `${pad(day)}.${pad(month)} ${pad(hours)}:${pad(minutes)}`;
  }

  return `${pad(day)}.${pad(month)}.${year} ${pad(hours)}:${pad(minutes)}`;
};
