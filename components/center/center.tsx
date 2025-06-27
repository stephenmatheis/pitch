import styles from './center.module.scss';

type centerProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

export function Center({ children, ...props }: centerProps) {
    return (
        <div {...props} className={styles['center']}>
            {children}
        </div>
    );
}
