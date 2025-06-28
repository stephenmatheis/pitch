import styles from './problem-slide.module.scss';

type ProblemSlideProps = {}

export function ProblemSlide({} : ProblemSlideProps) {
    return (
        <div className={styles['problem-slide']}>
            <h2>ProblemSlide</h2>
        </div>
    );
};
