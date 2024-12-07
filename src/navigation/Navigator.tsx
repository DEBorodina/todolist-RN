import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { USER_ID_KEY } from '@constants';
import { StartScreen } from '@screens';
import { selectUserId, useActions } from '@store';
import { getAsyncStorageItem } from '@utils';

import { Drawer } from './Drawer';

export const Navigator = () => {
  const [hasCheckedUser, setHasCheckedUser] = useState(false);
  const { setUserId } = useActions();
  const user = useSelector(selectUserId);

  useEffect(() => {
    const checkUser = async () => {
      const userId = await getAsyncStorageItem(USER_ID_KEY);

      setHasCheckedUser(true);

      if (userId) {
        setUserId(userId);
      }
    };

    checkUser();
  }, [setUserId]);

  if (!hasCheckedUser) {
    return null;
  }

  return user ? <Drawer /> : <StartScreen />;
};
