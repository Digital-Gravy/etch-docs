const fs = require('fs');
const path = require('path');

function generateCategoryList(folderPath, outputFile) {
  const files = fs.readdirSync(folderPath);
  const markdownFiles = files.filter(file => 
    (file.endsWith('.md') || file.endsWith('.mdx')) && 
    file !== 'index.md' && 
    file !== '_category_.json'
  );

  let content = `---
title: Dynamic Elements
sidebar_position: 1
---

# Dynamic Elements

Interactive components that respond to user actions and display dynamic content. These elements enhance user experience with rich, interactive functionality.

## Available Elements

`;

  markdownFiles.forEach(file => {
    const fileName = file.endsWith('.mdx') 
      ? path.basename(file, '.mdx')
      : path.basename(file, '.md');
    const displayName = fileName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    content += `- **[${displayName}](./${file})**\n`;
  });

  content += `
## Getting Started

Each dynamic element includes:
- **Setup instructions** - How to add and configure the element
- **Configuration options** - Available settings and properties
- **Usage examples** - Common implementation patterns
- **Best practices** - Tips for optimal performance and UX

## Common Features

Most dynamic elements support:
- **Responsive design** - Mobile-friendly interactions
- **Custom styling** - CSS customization options
- **Accessibility** - Screen reader and keyboard navigation support
- **Performance optimization** - Efficient loading and rendering

## Need Help?

If you can't find the specific element you're looking for, check our [Elements](../elements/) section for simpler components, or explore our [Components](../../components/) for more complex functionality.
`;

  fs.writeFileSync(outputFile, content);
  console.log(`Generated category list: ${outputFile}`);
}

// Usage example:
// generateCategoryList(
//   './docs/components-native',
//   './docs/components-native/index.md'
// );

module.exports = { generateCategoryList }; 