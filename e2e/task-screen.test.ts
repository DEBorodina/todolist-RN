import { by, device, element, expect } from 'detox';

describe('Task screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Should navigate to All tasks screen', async () => {
    await element(by.text('Get started')).tap();
    await element(by.id('burger-menu')).tap();
    await element(by.text('All tasks')).tap();

    await expect(element(by.text('All tasks')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Done tasks (0)'))).toBeVisible();
  });

  it('Should add task', async () => {
    await element(by.id('add')).tap();

    await expect(element(by.text('Title'))).toBeVisible();
    await expect(element(by.text('Description'))).toBeVisible();
    await expect(element(by.text('Category'))).toBeVisible();

    await element(by.id('input')).atIndex(0).typeText('React');
    await expect(element(by.text('React'))).toBeVisible();

    await element(by.id('input')).atIndex(1).typeText('Learn react');
    await expect(element(by.text('Learn react'))).toBeVisible();

    await element(by.id('input')).atIndex(2).typeText('S');
    await expect(element(by.text('School'))).toBeVisible();
    await expect(element(by.text('Shop'))).toBeVisible();
    await element(by.text('School')).tap();
    await expect(element(by.text('School'))).toBeVisible();
    await expect(element(by.text('Shop'))).not.toBeVisible();

    await element(by.id('add')).atIndex(0).tap();
    await element(by.id('input')).atIndex(3).typeText('Learn hooks');
    await expect(element(by.text('Learn hooks'))).toBeVisible();

    await element(by.text('Add')).tap();

    await expect(element(by.text('Learn react'))).toBeVisible();
    await expect(element(by.text('Learn hooks'))).toBeVisible();
    await expect(element(by.text('React'))).toBeVisible();
    await expect(element(by.id('checkbox')).atIndex(0)).toBeVisible();
  });

  it('Should edit task', async () => {
    await element(by.id('dots')).tap();

    await element(by.text('edit task')).tap();

    await element(by.id('input')).atIndex(0).typeText(' 1');
    await expect(element(by.text('React 1'))).toBeVisible();

    await element(by.id('input')).atIndex(1).typeText(' 1');
    await expect(element(by.text('Learn react 1'))).toBeVisible();

    await element(by.id('input')).atIndex(2).typeText(' 1');
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();

    await element(by.id('star')).tap();

    await element(by.text('Update')).tap();

    await expect(element(by.text('Learn react 1'))).toBeVisible();
    await expect(element(by.text('React 1'))).toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();
    await expect(element(by.id('checkbox')).atIndex(0)).toBeVisible();
  });

  it('Should go back', async () => {
    await element(by.id('arrow-back')).tap();

    await expect(element(by.text('you have '))).toBeVisible();
    await expect(element(by.text('1 tasks'))).toBeVisible();
    await expect(element(by.text('!'))).toBeVisible();
  });

  it('Should open tasks by category', async () => {
    await element(by.text('School')).tap();

    await expect(element(by.text('Tasks in category "School"'))).toBeVisible();
    await expect(element(by.text('Learn react 1'))).toBeVisible();
    await expect(element(by.text('React 1'))).toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();

    await element(by.id('arrow-back')).tap();
  });

  it('Should open important tasks ', async () => {
    await element(by.id('burger-menu')).tap();
    await element(by.text('Important tasks')).tap();

    await expect(element(by.text('Important tasks')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Learn react 1'))).toBeVisible();
    await expect(element(by.text('React 1'))).toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();

    await element(by.id('arrow-back')).tap();
  });

  it('Should search tasks', async () => {
    await element(by.id('input')).atIndex(0).typeText('Le');
    await element(by.id('search-icon')).tap();

    await expect(element(by.text('Search results for "Le"'))).toBeVisible();
    await expect(element(by.text('Learn react 1'))).toBeVisible();
    await expect(element(by.text('React 1'))).toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();
  });

  it('Should mark task as done', async () => {
    await element(by.id('checkbox')).atIndex(1).tap();

    await expect(element(by.text('Learn react 1'))).not.toBeVisible();
    await expect(element(by.text('React 1'))).not.toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).not.toBeVisible();

    await expect(element(by.text('Done tasks (1)'))).toBeVisible();
    await element(by.id('chevron-down')).tap();

    await expect(element(by.text('Learn react 1'))).toBeVisible();
    await expect(element(by.text('React 1'))).toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();
    await expect(element(by.id('chevron-up'))).toBeVisible();

    await element(by.id('arrow-back')).tap();
  });

  it('Should open done tasks ', async () => {
    await element(by.id('burger-menu')).tap();
    await element(by.text('Done tasks')).tap();

    await expect(element(by.text('Done tasks')).atIndex(0)).toBeVisible();
    await expect(element(by.text('Learn react 1'))).toBeVisible();
    await expect(element(by.text('React 1'))).toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).toBeVisible();

    await expect(element(by.text('Done tasks (1)'))).not.toBeVisible();
  });

  it('Should delete task', async () => {
    await element(by.id('dots')).tap();

    await element(by.text('delete task')).tap();

    await expect(element(by.text('Learn react 1'))).not.toBeVisible();
    await expect(element(by.text('React 1'))).not.toBeVisible();
    await expect(element(by.text('Learn hooks 1'))).not.toBeVisible();
  });
});
