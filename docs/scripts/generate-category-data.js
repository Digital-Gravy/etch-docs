const fs = require('fs');
const path = require('path');

function generateCategoryData() {
  const docsPath = path.join(__dirname, '..', 'docs');
  const categoryData = {};

  // Function to recursively find all directories with markdown files
  function findCategories(dirPath, relativePath = '') {
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
          
          const categoryKey = `docs/${currentRelativePath}`;
          categoryData[categoryKey] = markdownFiles;
        }
        
        // Recursively check subdirectories
        findCategories(fullPath, currentRelativePath);
      }
    }
  }

  // Start the discovery process
  findCategories(docsPath);

  // Write the data to a JSON file that can be imported by the React component
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'category-files.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(categoryData, null, 2));
  
  console.log('Generated category data:', outputPath);
  console.log('Categories found:', Object.keys(categoryData));
}

generateCategoryData(); 