import { by, device, element, expect } from 'detox';

describe('Welcome screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should navigate to Welcome screen', async () => {
    await expect(element(by.text('Get started'))).toBeVisible();
    await expect(element(by.text('Manage your tasks'))).toBeVisible();
    await expect(
      element(
        by.text(
          'Organize, plan, and collaborate on tasks with Modsen todo list.Your busy life deserves this.you can manage checklist and your goal.',
        ),
      ),
    ).toBeVisible();
  });
});
