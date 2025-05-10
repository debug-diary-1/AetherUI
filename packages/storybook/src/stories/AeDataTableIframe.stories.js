import { html } from 'lit';

export default {
  title: 'Components/DataTable/Iframe',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

// A helper function to create an iframe with the datatable
const createIframeContent = (config) => {
  const { withSelection = false, width = 500 } = config;
  
  // Create stringified data and columns
  const data = JSON.stringify([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
  
  const columns = JSON.stringify([
    { id: 'name', field: 'name', header: 'Name' },
    { id: 'email', field: 'email', header: 'Email' }
  ]);
  
  // Create the HTML content for the iframe
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DataTable Test</title>
      <script type="module">
        // Import the datatable module
        import('@aetherui/datatable')
          .then(module => {
            if (module.defineDataTableElements) {
              module.defineDataTableElements();
              console.log('DataTable components registered');
              
              // Create the table after components are registered
              setTimeout(createTable, 100);
            }
          })
          .catch(err => {
            console.error('Failed to load datatable components', err);
            document.getElementById('error').textContent = 'Error: ' + err.message;
            document.getElementById('error').style.display = 'block';
          });
          
        function createTable() {
          const container = document.getElementById('table-container');
          
          // Create table element
          const table = document.createElement('ae-datatable');
          
          // Set properties
          table.data = ${data};
          table.columns = ${columns};
          
          // Set attributes
          ${withSelection ? "table.setAttribute('selectable', '');" : ""}
          
          // Add to container
          container.appendChild(table);
          document.getElementById('loading').style.display = 'none';
        }
      </script>
      <style>
        body {
          font-family: sans-serif;
          margin: 0;
          padding: 16px;
        }
        
        #table-container {
          width: 100%;
        }
        
        #loading, #error {
          padding: 16px;
          text-align: center;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        
        #error {
          background-color: #fee2e2;
          color: #991b1b;
          display: none;
        }
      </style>
    </head>
    <body>
      <div id="loading">Loading DataTable component...</div>
      <div id="error"></div>
      <div id="table-container"></div>
    </body>
    </html>
  `;
};

// Function to create iframe element
const createIframeStory = (config) => {
  const { title, withSelection = false, width = 500 } = config;
  
  // Create a blob with the iframe content
  const blob = new Blob([createIframeContent({ withSelection, width })], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Return the iframe as a lit-html template
  return html`
    <div style="padding: 20px;">
      <h3>${title}</h3>
      <iframe 
        src=${url} 
        style="width: ${width}px; height: 200px; border: 1px solid #e5e7eb; border-radius: 4px;" 
        frameborder="0"
      ></iframe>
    </div>
  `;
};

// Basic example
export const Basic = {
  render: () => {
    return createIframeStory({ 
      title: 'Basic DataTable in iframe',
      width: 500
    });
  }
};

// With selection
export const WithSelection = {
  render: () => {
    return createIframeStory({ 
      title: 'DataTable with Selection in iframe',
      withSelection: true,
      width: 500
    });
  }
};

// Different widths to test how the component handles space constraints
export const NarrowWidth = {
  render: () => {
    return createIframeStory({ 
      title: 'DataTable in narrow iframe',
      width: 300
    });
  }
};

export const NarrowWithSelection = {
  render: () => {
    return createIframeStory({ 
      title: 'DataTable with Selection in narrow iframe',
      withSelection: true,
      width: 300
    });
  }
};