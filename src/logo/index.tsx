import type { FC } from 'react';

import cn from 'clsx';

import logo from './logo.svg';
import styles from './styles.module.css';

interface Props {
  className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <img className={styles.logo} src={logo} alt="Logo" />
      <span className={styles.text}>Brello</span>
    </div>
  );
};
