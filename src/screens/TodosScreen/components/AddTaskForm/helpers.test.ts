import { Category } from '@firestore';

import { filterCategories } from './helpers';
import { updateSubtasks } from './helpers';
import { validateCategories } from './helpers';

const categories: Category[] = [
  {
    id: '1',
    name: 'Work',
    color: '',
    iconName: '',
    userId: '',
    tasksAmount: 0,
  },
  {
    id: '2',
    name: 'Personal',
    color: '',
    iconName: '',
    userId: '',
    tasksAmount: 0,
  },
  {
    id: '3',
    name: 'Groceries',
    color: '',
    iconName: '',
    userId: '',
    tasksAmount: 0,
  },
  {
    id: '4',
    name: 'Fitness',
    color: '',
    iconName: '',
    userId: '',
    tasksAmount: 0,
  },
  {
    id: '5',
    name: 'Shopping',
    color: '',
    iconName: '',
    userId: '',
    tasksAmount: 0,
  },
  {
    id: '6',
    name: 'Study',
    color: '',
    iconName: '',
    userId: '',
    tasksAmount: 0,
  },
];

describe('filterCategories', () => {
  it('should filter categories based on search value (case insensitive)', () => {
    const result = filterCategories(categories, 'work');
    expect(result).toEqual([categories[0]]);

    const resultUpperCase = filterCategories(categories, 'WORK');
    expect(resultUpperCase).toEqual([categories[0]]);
  });

  it('should limit the number of categories to the specified amount', () => {
    const result = filterCategories(categories, 's', 3);
    expect(result.length).toBe(3);
    expect(result).toEqual([categories[1], categories[2], categories[3]]);
  });

  it('should return only the first "amount" categories if more matches exist', () => {
    const result = filterCategories(categories, 'e', 2);
    expect(result.length).toBe(2);
    expect(result).toEqual([categories[1], categories[2]]);
  });

  it('should return all categories if there are fewer than the specified "amount" matches', () => {
    const result = filterCategories(categories, 'x', 10);
    expect(result).toEqual([]);
  });

  it('should return a maximum of "amount" categories even if more match the search', () => {
    const result = filterCategories(categories, 's', 2);
    expect(result.length).toBe(2);
    expect(result).toEqual([categories[1], categories[2]]);
  });

  it('should use the default amount of 5 when "amount" is not provided', () => {
    const result = filterCategories(categories, '');
    expect(result.length).toBe(5);
    expect(result).toEqual([
      categories[0],
      categories[1],
      categories[2],
      categories[3],
      categories[4],
    ]);
  });
});

jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

describe('updateSubtasks', () => {
  it('should update the title of an existing subtask at the given index', () => {
    const onChange = jest.fn();
    const subtasks = [
      { title: 'Subtask 1', id: 'uuid-1', isDone: false },
      { title: 'Subtask 2', id: 'uuid-2', isDone: false },
    ];

    const index = 1;
    const newTitle = 'Updated Subtask 2';

    updateSubtasks(onChange, subtasks, index)(newTitle);

    expect(subtasks[index].title).toBe(newTitle);
    expect(onChange).toHaveBeenCalledWith(subtasks);
  });

  it('should add a new subtask when there is space for it (less than 5 subtasks)', () => {
    const onChange = jest.fn();
    const subtasks = [
      { title: 'Subtask 1', id: 'uuid-1', isDone: false },
      { title: 'Subtask 2', id: 'uuid-2', isDone: false },
    ];

    updateSubtasks(onChange, subtasks)(undefined);

    expect(subtasks.length).toBe(3);
    expect(subtasks[2].title).toBe('');
    expect(subtasks[2].id).toBe('mocked-uuid');
    expect(onChange).toHaveBeenCalledWith(subtasks);
  });

  it('should not add a new subtask if there are already 5 subtasks', () => {
    const onChange = jest.fn();
    const subtasks = [
      { title: 'Subtask 1', id: 'uuid-1', isDone: false },
      { title: 'Subtask 2', id: 'uuid-2', isDone: false },
      { title: 'Subtask 3', id: 'uuid-3', isDone: false },
      { title: 'Subtask 4', id: 'uuid-4', isDone: false },
      { title: 'Subtask 5', id: 'uuid-5', isDone: false },
    ];

    updateSubtasks(onChange, subtasks)(undefined);

    expect(subtasks.length).toBe(5);
    expect(onChange).toHaveBeenCalledWith(subtasks);
  });

  it('should handle undefined subtasks', () => {
    const onChange = jest.fn();

    updateSubtasks(onChange)(undefined);

    expect(onChange).toHaveBeenCalledWith([
      { title: '', id: 'mocked-uuid', isDone: false },
    ]);
  });

  it('should not add a new subtask if all subtasks already have titles', () => {
    const onChange = jest.fn();
    const subtasks = [
      { title: 'Subtask 1', id: 'uuid-1', isDone: false },
      { title: 'Subtask 2', id: 'uuid-2', isDone: false },
      { title: 'Subtask 3', id: 'uuid-3', isDone: false },
      { title: 'Subtask 4', id: 'uuid-4', isDone: false },
      { title: 'Subtask 5', id: 'uuid-5', isDone: false },
    ];

    updateSubtasks(onChange, subtasks)(undefined);

    expect(subtasks.length).toBe(5);
    expect(onChange).toHaveBeenCalledWith(subtasks);
  });
});

describe('validateCategories', () => {
  it('should return true if category is valid', () => {
    const validate = validateCategories(categories);
    const result = validate('Work');
    expect(result).toBe(true);
  });

  it('should return the error message if category is invalid', () => {
    const validate = validateCategories(categories);
    const result = validate('Invalid Category');
    const expectedError = 'Must be from the list';
    expect(result).toBe(expectedError);
  });

  it('should return custom error message if provided', () => {
    const customError = 'Category does not exist';
    const validate = validateCategories(categories, customError);
    const result = validate('Invalid Category');
    expect(result).toBe(customError);
  });

  it('should return true for a valid category name in different case', () => {
    const validate = validateCategories(categories);
    const result = validate('work');
    expect(result).toBe(true);
  });

  it('should return the error message if category is invalid regardless of case', () => {
    const validate = validateCategories(categories);
    const result = validate('invalid category');
    expect(result).toBe('Must be from the list');
  });
});
