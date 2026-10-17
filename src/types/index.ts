export interface DateInfo {
  dayName: string;
  date: number;
  monthName: string;
  year: number;
  weekNumber: number;
  formattedDate: string;
  formattedWeek: string;
  fileName: string;
  folderPath: string;
}

export interface UploadResult {
  success: boolean;
  message: string;
  fileName?: string;
  folderPath?: string;
  error?: string;
}