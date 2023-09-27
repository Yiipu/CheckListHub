import styles from './NestTemplate.module.css';

export interface INestTemplate { }

function NestTemplate({
  children,
}: {
  children: React.ReactNode,
}) {
  return <div className={styles.container}>{children}</div>;
};

export default NestTemplate;