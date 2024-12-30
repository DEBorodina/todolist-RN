import { ReactNode } from 'react';

export type MainLayoutProps = Partial<BackgroundProps> & {
  children: ReactNode;
};

export type BackgroundProps = {
  isFullLayout?: boolean;
};
