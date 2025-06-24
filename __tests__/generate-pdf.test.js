const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

describe('generate-pdf.js', () => {
  const scriptPath = path.resolve(__dirname, '../scripts/generate-pdf.js');
  const resumePath = path.resolve(__dirname, '../resume_example.json');
  const outputPath = path.resolve(__dirname, '../resume.pdf');

  afterEach(() => {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });

  test('script runs and generates PDF', () => {
    // Simulate running the script (mock PDF generation if needed)
    try {
      execSync(`node ${scriptPath} ${resumePath} ${outputPath}`);
    } catch (e) {
      // If script fails, test should fail
      throw new Error('generate-pdf.js failed to run');
    }
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});
