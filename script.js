// JavaScript using jQuery
$(document).ready(function () {
  // Load default markdown on page load
  const defaultMarkdown = `# Heading 1
## Heading 2
[Link](https://www.example.com)
\`Inline Code\`
\`\`\`
// Code Block
const example = "Hello, World!";
\`\`\`
- List item 1
- List item 2
> Blockquote
![Image](https://via.placeholder.com/150)
**Bold Text**`;

  // Set default markdown in the editor
  $('#editor').val(defaultMarkdown);

  // Create a custom renderer to handle GitHub-flavored markdown
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level, raw) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${escapedText}">${text}</h${level}>\n`;
  };

  // Update preview as the user types
  $('#editor').on('input', function () {
    const markdown = $(this).val();

    // Use marked's option "breaks" to interpret carriage returns as line breaks
    const markedOptions = {
      renderer: renderer,
      breaks: true
    };

    const renderedHTML = marked(markdown, markedOptions);
    $('#preview').html(renderedHTML);

    // Check if there are two <br> elements in the preview
    const brCount = ($('#preview').html().match(/<br>/g) || []).length;

    // Perform the test
    if (brCount !== 2) {
      console.error('Test failed: The preview does not contain the expected number of <br> elements.');
    }
  });
});

