import styles from './BaseTemplate.module.css'

export interface IBaseTemplate { }

function BaseTemplate() {
  return <div className={styles.container} />
}

export default BaseTemplate
