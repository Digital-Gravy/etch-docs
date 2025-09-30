import styles from './VersionBadge.module.css';

type VersionBadgeProps = {
  version: string;
};

export default function VersionBadge({ version }: VersionBadgeProps) {
  return <div className={styles.versionBadge}>Since Version: {version}</div>;
}