const fs = require('fs');
const path = require('path');

function setAlphabeticalOrder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const markdownFiles = files.filter(file => 
    (file.endsWith('.md') || file.endsWith('.mdx')) && 
    file !== '00-overview.md' && 
    file !== '_category_.json'
  );

  // Sort files alphabetically
  markdownFiles.sort();

  // Set positions starting from 2 (after overview)
  markdownFiles.forEach((file, index) => {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Update sidebar_position
    const updatedContent = content.replace(
      /sidebar_position: \d+/,
      `sidebar_position: ${index + 2}`
    );
    
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${file}: sidebar_position = ${index + 2}`);
  });

  console.log(`\nUpdated ${markdownFiles.length} files to alphabetical order`);
}

// Usage
setAlphabeticalOrder('./docs/elements/dynamic-elements'); 