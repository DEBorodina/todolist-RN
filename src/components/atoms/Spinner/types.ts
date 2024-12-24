import { SIZES } from './constants';

export type SpinnerProps = {
  durationMs?: number;
  size?: keyof typeof SIZES;
  // TODO: придумать как выносить цвета
  color?: 'primary' | 'secondary' | 'primaryInverted';
};

export type ContainerProps = Required<Pick<SpinnerProps, 'size'>>;

export type BackgroundProps = Required<Pick<SpinnerProps, 'size' | 'color'>>;
