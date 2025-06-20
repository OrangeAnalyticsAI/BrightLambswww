const fs = require('fs');
const path = require('path');

// Define the mapping from current filenames to expected filenames
const fileMappings = [
  { from: 'business-needs-strategy.jpg', to: 'strategic-analysis.jpg' },
  { from: 'Data-analysis.jpg', to: 'data-analysis.jpg' },
  { from: 'Documentation.jpg', to: 'documentation.jpg' },
  { from: 'implementation-support.jpg', to: 'implementation-oversight.jpg' },
  { from: 'Mentoring.jpg', to: 'mentoring.jpg' },
  { from: 'Process-optimisation.jpg', to: 'process-optimization.jpg' },
  // 'process-automation.jpg' and 'requirements-elicitation.jpg' are already correct
  // 'solution-assessment.jpg' is already correct
];

const imagesDir = path.join(process.cwd(), 'public', 'images', 'services');

// Rename each file
fileMappings.forEach(({ from, to }) => {
  const fromPath = path.join(imagesDir, from);
  const toPath = path.join(imagesDir, to);
  
  if (fs.existsSync(fromPath)) {
    try {
      fs.renameSync(fromPath, toPath);
      console.log(`✅ Renamed: ${from} → ${to}`);
    } catch (error) {
      console.error(`❌ Error renaming ${from}:`, error.message);
    }
  } else {
    console.log(`ℹ️  File not found: ${from}`);
  }
});

console.log('\n🎉 Image renaming complete!');
