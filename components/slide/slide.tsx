import styles from './slide.module.scss';

type SlideProps = {
    children?: React.ReactNode;
};

export function Slide({ children }: SlideProps) {
    return <div className={styles['slide']}>{children}</div>;
}
