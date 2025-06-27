import styles from './extra-large.module.scss';

type ExtraLargeProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

export function ExtraLarge({ children, ...props }: ExtraLargeProps) {
    return (
        <div {...props} className={styles['extra-large']}>
            {children}
        </div>
    );
}
