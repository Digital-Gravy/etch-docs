import { useState } from 'react';
import styles from './CopyToCliboard.module.css';

type CopyToClipboardProps = {
  label: string;
  value: string;
  successText?: string;
  errorText?: string;
};

export default function CopyToClipboard({
  label,
  value,
  successText = 'Copied!',
  errorText = 'Failed to copy',
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy failed', e);
      setCopied(false);
      setErrorMessage(errorText || undefined);
      setTimeout(() => setErrorMessage(undefined), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={styles.btnCopyToClipboard}
      aria-live="polite"
      aria-label={copied ? successText : errorMessage || label}
      title={copied ? successText : errorMessage || label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>{copied ? successText : errorMessage || label}</span>
    </button>
  );
}
