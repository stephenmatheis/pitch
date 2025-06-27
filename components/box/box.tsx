import styles from './box.module.scss';

type BoxProps = {
    children?: React.ReactNode;
};

export function Box({ children }: BoxProps) {
    return <div className={styles['box']}>{children}</div>;
}
