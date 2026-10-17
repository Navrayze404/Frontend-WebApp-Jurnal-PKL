import { DateInfo } from '../../../types';

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const getDateInfo = (d = new Date()): DateInfo => {
  const dayName = DAY_NAMES[d.getDay()];
  const date = d.getDate();
  const monthName = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  const weekNumber = Math.ceil(date / 7);

  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  const hhmmss = `${hh}${mm}${ss}`;

  return {
    dayName,
    date,
    monthName,
    year,
    weekNumber,
    formattedDate: `${dayName}, ${date} ${monthName} ${year}`,
    formattedWeek: `Minggu ke-${weekNumber} | ${monthName} ${year}`,
    fileName: `foto-${dayName}${date}${monthName}${year}-${hhmmss}.jpg`,
    folderPath: `LaporanJurnalPKL/Bulan${monthName}${year}/Minggu${weekNumber}`,
  };
};

export const isValidAppsScriptUrl = (url: string): boolean => {
  try {
    const u = new URL(url);
    return (
      u.protocol === 'https:' &&
      u.hostname === 'script.google.com' &&
      u.pathname.startsWith('/macros/s/') &&
      u.pathname.endsWith('/exec')
    );
  } catch {
    return false;
  }
};