import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import the generated category data
import categoryFiles from '../data/category-files.json';

interface CategoryOverviewProps {
  categoryPath: string;
  excludeFiles?: string[];
  title?: string;
}

export default function CategoryOverview({ 
  categoryPath, 
  excludeFiles = ['00-overview.md', '_category_.json'],
  title = 'Available Items'
}: CategoryOverviewProps) {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  
  // Use the generated category data
  const getFilesForCategory = (path: string) => {
    // Try different path formats to handle various ways the path might be passed
    const possiblePaths = [
      path,
      `docs/${path}`,
      path.replace(/^elements\//, 'docs/elements/'),
      path.replace(/^components\//, 'docs/components/'),
      path.replace(/^templates\//, 'docs/templates/'),
      path.replace(/^interface\//, 'docs/interface/'),
      path.replace(/^getting-started\//, 'docs/getting-started/'),
      path.replace(/^how-to\//, 'docs/how-to/'),
      path.replace(/^loops\//, 'docs/loops/'),
      path.replace(/^conditional-logic\//, 'docs/conditional-logic/'),
      path.replace(/^dynamic-data\//, 'docs/dynamic-data/'),
      path.replace(/^gutenberg\//, 'docs/gutenberg/'),
      path.replace(/^known-issues\//, 'docs/known-issues/'),
      path.replace(/^top-priorities\//, 'docs/top-priorities/')
    ];
    
    for (const possiblePath of possiblePaths) {
      if (categoryFiles[possiblePath]) {
        return categoryFiles[possiblePath];
      }
    }
    
    return [];
  };

  const files = getFilesForCategory(categoryPath);
  const filteredFiles = files.filter(file => !excludeFiles.includes(file));
  
  // Keep only the filtered files
  const allFiles = filteredFiles;

  const formatTitle = (filename: string) => {
    return filename
      .replace(/\.(md|mdx)$/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Generate the correct URL path based on categoryPath
  const getUrlPath = (categoryPath: string) => {
    // Convert categoryPath to URL path
    // e.g., "elements/basic-elements" -> "/elements/basic-elements"
    return `/${categoryPath}`;
  };

  return (
    <div className="category-overview">
      <h2>{title}</h2>
      <div className="category-grid">
        {allFiles.map((file) => (
          <div key={file} className="category-item">
            <a href={`${getUrlPath(categoryPath)}/${file.replace(/\.(md|mdx)$/, '')}`} className="category-link">
              {formatTitle(file)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 