const fs = require('fs');
const path = require('path');

// One entry per docs plugin instance. `key` is the prefix used in
// category-files.json, and matches the instance's content folder.
const DOCS_INSTANCES = [
  { dir: 'docs', key: 'docs' },
  { dir: 'studio-docs', key: 'studio-docs' }
];

function generateCategoryData() {
  const categoryData = {};

  // Function to recursively find all directories with markdown files
  function findCategories(dirPath, keyPrefix, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const currentRelativePath = relativePath ? `${relativePath}/${item}` : item;
        
        // Check if this directory contains markdown files
        const subItems = fs.readdirSync(fullPath);
        const hasMarkdownFiles = subItems.some(subItem => 
          (subItem.endsWith('.md') || subItem.endsWith('.mdx')) && 
          subItem !== '00-overview.md' && 
          subItem !== '_category_.json'
        );
        
        if (hasMarkdownFiles) {
          // This is a category directory
          const markdownFiles = subItems.filter(file => 
            (file.endsWith('.md') || file.endsWith('.mdx')) && 
            file !== '00-overview.md' && 
            file !== '_category_.json'
          );
          
          const categoryKey = `${keyPrefix}/${currentRelativePath}`;
          categoryData[categoryKey] = markdownFiles;
        }

        // Recursively check subdirectories
        findCategories(fullPath, keyPrefix, currentRelativePath);
      }
    }
  }

  // Start the discovery process, once per docs instance
  for (const instance of DOCS_INSTANCES) {
    const instancePath = path.join(__dirname, '..', instance.dir);

    if (!fs.existsSync(instancePath)) {
      console.log(`Skipping missing docs instance: ${instance.dir}`);
      continue;
    }

    findCategories(instancePath, instance.key);
  }

  // Write the data to a JSON file that can be imported by the React component
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'category-files.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(categoryData, null, 2));
  
  console.log('Generated category data:', outputPath);
  console.log('Categories found:', Object.keys(categoryData));
}

generateCategoryData(); 