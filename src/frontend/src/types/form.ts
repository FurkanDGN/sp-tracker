export interface FormValues {
  timeNumber: string;
  timeType: { label: string; value: 'day' | 'week' | 'month' };
  showUnassigned: boolean;
}
