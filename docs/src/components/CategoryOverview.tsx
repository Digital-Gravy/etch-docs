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

  // The same overview pages exist in both docs instances (Etch WP at `/`, Etch
  // Studio at `/studio`), so resolve files and links against the current one.
  const isStudio = location.pathname.startsWith('/studio');
  const dataPrefix = isStudio ? 'studio-docs' : 'docs';
  const routePrefix = isStudio ? '/studio' : '';

  // Use the generated category data
  const getFilesForCategory = (path: string) => {
    // Try different path formats to handle various ways the path might be passed
    const possiblePaths = [
      path,
      `${dataPrefix}/${path}`
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
    // Convert categoryPath to URL path, scoped to the current docs instance
    // e.g., "elements/basic-elements" -> "/elements/basic-elements"
    //       (or "/studio/elements/basic-elements" inside the Studio docs)
    return `${routePrefix}/${categoryPath}`;
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