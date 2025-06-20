const fs = require('fs');
const path = require('path');

// List of service page files and their image paths
const servicePages = [
  { file: 'app/services/strategic-enterprise-analysis/page.tsx', current: '/images/strategic-analysis.jpg' },
  { file: 'app/services/solution-assessment/page.tsx', current: '/images/solution-assessment.jpg' },
  { file: 'app/services/requirements-elicitation/page.tsx', current: '/images/requirements-elicitation.jpg' },
  { file: 'app/services/process-optimization/page.tsx', current: '/images/process-optimization.jpg' },
  { file: 'app/services/process-automation/page.tsx', current: '/images/process-automation.jpg' },
  { file: 'app/services/mentoring/page.tsx', current: '/images/mentoring.jpg' },
  { file: 'app/services/implementation-support/page.tsx', current: '/images/implementation-oversight.jpg' },
  { file: 'app/services/documentation/page.tsx', current: '/images/documentation.jpg' },
  { file: 'app/services/data-analysis/page.tsx', current: '/images/data-analysis.jpg' },
  { file: 'app/services/business-needs-strategy/page.tsx', current: '/images/strategic-analysis.jpg' },
];

// Update each file
servicePages.forEach(({ file, current }) => {
  const filePath = path.join(process.cwd(), file);
  const newPath = current.replace('/images/', '/images/services/');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(
      new RegExp(`imageUrl="${current.replace(/\//g, '\\/')}"`),
      `imageUrl="${newPath}"`
    );
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Updated ${file}`);
    } else {
      console.log(`ℹ️  No changes needed for ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
  }
});

console.log('\n🎉 All service page image paths have been updated!');
