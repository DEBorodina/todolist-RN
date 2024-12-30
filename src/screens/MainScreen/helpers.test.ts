import { Category } from '@firestore';

import { formatDate, getTasksAmount } from './helpers';

describe('Utility Functions', () => {
  describe('getTasksAmount', () => {
    it('returns 0 for empty categories array', () => {
      const categories: Category[] = [];
      const result = getTasksAmount(categories);
      expect(result).toBe(0);
    });

    it('returns the correct total tasks amount when categories have tasks', () => {
      const categories = [
        { id: '1', tasksAmount: 5 },
        { id: '2', tasksAmount: 10 },
        { id: '3', tasksAmount: 3 },
      ] as Category[];
      const result = getTasksAmount(categories);
      expect(result).toBe(18);
    });
  });

  describe('formatDate', () => {
    it('formats the date correctly', () => {
      const mockDate = new Date(2024, 0, 15);
      jest.spyOn(global, 'Date').mockImplementationOnce(() => mockDate);

      const result = formatDate();
      expect(result).toBe('Monday,january 15,2024');

      (global.Date as unknown as jest.Mock).mockRestore();
    });

    it('handles different days and months correctly', () => {
      const mockDate = new Date(2024, 6, 23);
      jest.spyOn(global, 'Date').mockImplementationOnce(() => mockDate);

      const result = formatDate();
      expect(result).toBe('Tuesday,july 23,2024');
      (global.Date as unknown as jest.Mock).mockRestore();
    });
  });
});
