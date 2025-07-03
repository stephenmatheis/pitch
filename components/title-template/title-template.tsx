import styles from './title-template.module.scss';

type TitleTemplateProps = {
    title: React.ReactNode | string;
    subtitle?: React.ReactNode | string;
};

export function TitleTemplate({ title, subtitle }: TitleTemplateProps) {
    return (
        <div className={styles['title-template']}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
        </div>
    );
}
