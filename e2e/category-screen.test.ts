import { by, device, element, expect } from 'detox';

describe('Category screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should navigate to Category screen after clicking on "Get started"', async () => {
    await element(by.text('Get started')).tap();

    await expect(element(by.id('input'))).toBeVisible();
    await expect(element(by.id('burger-menu'))).toBeVisible();
    await expect(element(by.text('Modsen Todo list'))).toBeVisible();

    await expect(element(by.text('Work out'))).toBeVisible();
    await expect(element(by.text('Work'))).toBeVisible();
    await expect(element(by.text('Shop'))).toBeVisible();
    await expect(element(by.text('Read'))).toBeVisible();
    await expect(element(by.text('School'))).toBeVisible();

    await expect(element(by.text('0')).atIndex(0)).toBeVisible();
    await expect(element(by.text('0')).atIndex(1)).toBeVisible();
    await expect(element(by.text('0')).atIndex(2)).toBeVisible();
    await expect(element(by.text('0')).atIndex(3)).toBeVisible();
    await expect(element(by.text('0')).atIndex(4)).toBeVisible();

    await expect(element(by.text('you have '))).toBeVisible();
    await expect(element(by.text('no tasks'))).toBeVisible();
    await expect(element(by.text('!'))).toBeVisible();
  });

  it('Should open and close drawer menu', async () => {
    await element(by.id('burger-menu')).tap();

    await expect(element(by.text('All tasks'))).toBeVisible();
    await expect(element(by.text('Important tasks'))).toBeVisible();
    await expect(element(by.text('Done tasks'))).toBeVisible();
    await expect(element(by.text('Switch theme'))).toBeVisible();
    await expect(element(by.id('back-arrow'))).toBeVisible();

    await element(by.id('back-arrow')).tap();

    await expect(element(by.text('All tasks'))).not.toBeVisible();
    await expect(element(by.text('Important tasks'))).not.toBeVisible();
    await expect(element(by.text('Done tasks'))).not.toBeVisible();
    await expect(element(by.text('Switch theme'))).not.toBeVisible();
    await expect(element(by.id('back-arrow'))).not.toBeVisible();
  });

  it('Should add new category', async () => {
    await element(by.id('add-category-button')).tap();

    await expect(element(by.text('Add category'))).toBeVisible();
    await expect(element(by.text('add'))).toBeVisible();

    await expect(element(by.text('Category'))).toBeVisible();
    await expect(element(by.text('Icon'))).toBeVisible();

    await element(by.id('input')).atIndex(1).typeText('Programming');
    await expect(element(by.text('Programming'))).toBeVisible();

    await element(by.id('input')).atIndex(2).typeText('logo-r');
    await expect(element(by.text('logo-react'))).toBeVisible();
    await expect(element(by.text('logo-reddit'))).toBeVisible();
    await expect(element(by.text('logo-rss'))).toBeVisible();

    await element(by.text('logo-react')).tap();

    await expect(element(by.text('logo-react'))).toBeVisible();
    await expect(element(by.text('logo-reddit'))).not.toBeVisible();
    await expect(element(by.text('logo-rss'))).not.toBeVisible();

    await element(by.text('add')).tap();

    await expect(element(by.text('Programming'))).toBeVisible();
  });
});
