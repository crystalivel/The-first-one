const fs = require ('fs');
const path = require('path');
const textfileDir = path.join(__dirname, 'textfile');
async function processFiles(inputDir = './input', outputDir = './output') {
    try {
        // check if the directories exist
        await fs.mkdir(outputDir, { recursive: true });
        
        // Get list of files in input directory
        const files = await fs.readdir(inputDir);
        
        // Process each file concurrently
        await Promise.all(files.map(async file => {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `processed_${file}`);
            
            try {
                // Read file content
                const content = await fs.readFile(inputPath, 'utf8');
                
                // Apply transformations
                const transformedContent = transformContent(content);
                
                // Write processed content
                await fs.writeFile(outputPath, transformedContent);
                console.log(`Processed ${file} → ${path.basename(outputPath)}`);
            } catch (err) {
                console.error(`Error processing ${file}: ${err.message}`);
            }
        }));
        
        console.log('All files processed successfully');
    } catch (err) {
        console.error('Fatal error:', err.message);
    }
}

function transformContent(content) {
    // Apply multiple transformations
    const timestamp = `// Processed: ${new Date().toLocaleString()}\n\n`;
    const uppercase = content.toUpperCase();
    const reversed = `\n\n// Reversed content:\n${content.split('').reverse().join('')}`;
    
    return timestamp + uppercase + reversed;
}
