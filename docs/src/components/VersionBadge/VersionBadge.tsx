import styles from './VersionBadge.module.css';

type VersionBadgeProps = {
  version: string;
  style?: React.CSSProperties;
};

export default function VersionBadge({ version, style }: VersionBadgeProps) {
  return <div className={styles.versionBadge} style={style}>Since: {version}</div>;
}