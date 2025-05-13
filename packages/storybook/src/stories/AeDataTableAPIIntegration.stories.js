import { html } from 'lit-html';
import { ref } from 'lit/directives/ref.js';

// Dynamic imports to ensure components are registered
const ensureComponentsRegistered = async () => {
  if (typeof window !== 'undefined') {
    try {
      // Use a more reliable dynamic import approach
      const datatableModule = await import('@aetherui/datatable');

      if (datatableModule.defineDataTableElements) {
        datatableModule.defineDataTableElements();
        console.log('DataTable components registered via defineDataTableElements');
      } else {
        console.warn('defineDataTableElements not found in module');
      }
    } catch (err) {
      console.error('Error registering DataTable components:', err);

      // Fallback to direct script approach if needed
      const script = document.createElement('script');
      script.type = 'module';
      script.textContent = `
        import('@aetherui/datatable')
          .then(m => m.defineDataTableElements?.())
          .catch(e => console.error('Fallback registration failed:', e));
      `;
      document.head.appendChild(script);
    }
  }
};

// Try to register components
ensureComponentsRegistered();

// Backwards compatibility for story rendering
const ensureDataTableComponents = () => {
  try {
    if (typeof window !== 'undefined') {
      // Check if components are already defined
      if (!customElements.get('ae-datatable')) {
        console.log('Components not found, trying again to register...');
        ensureComponentsRegistered();
      }
    }
  } catch (e) {
    console.warn('Error in ensureDataTableComponents:', e);
  }
};

export default {
  title: 'Components/DataTable/APIIntegration',
  component: 'ae-datatable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# DataTable API Integration

This section demonstrates how to integrate the DataTable component with external APIs, implementing:

- Loading data from a RESTful API
- Server-side filtering
- Server-side pagination
- Server-side sorting
- Loading state management
- Error handling

These examples use public APIs to show real-world integration scenarios.
        `
      }
    }
  }
};

// Create a container for the datatable
const createContainer = (content) => {
  return html`
    <div style="width: 100%; overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 4px;">
      ${content}
    </div>
  `;
};

// Basic API loading example with JSONPlaceholder users
export const BasicAPILoading = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // States for data loading
  const state = {
    data: [],
    loading: true,
    error: null
  };
  
  // Define columns for users data
  const columns = [
    { 
      id: 'id', 
      field: 'id', 
      header: 'ID', 
      sortable: true,
      width: '80px',
      align: 'center'
    },
    { 
      id: 'name', 
      field: 'name', 
      header: 'Name', 
      sortable: true, 
      filterable: true,
      dataType: 'string',
      width: '220px'
    },
    { 
      id: 'username', 
      field: 'username', 
      header: 'Username', 
      sortable: true, 
      filterable: true,
      dataType: 'string',
      width: '150px'
    },
    { 
      id: 'email', 
      field: 'email', 
      header: 'Email', 
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '220px'
    },
    {
      id: 'website',
      field: 'website',
      header: 'Website',
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '150px',
      renderer: (value) => html`
        <a href="https://${value}" target="_blank" style="color: #3b82f6; text-decoration: underline;">
          ${value}
        </a>
      `,
    }
  ];
  
  // Function to load data from JSONPlaceholder API
  const loadData = async () => {
    if (!datatableRef) return;
    
    try {
      // Set loading state
      state.loading = true;
      datatableRef.loading = true;
      
      // Fetch data from JSONPlaceholder API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse JSON response
      const data = await response.json();
      state.data = data;
      state.error = null;
      
      // Update datatable with fetched data
      datatableRef.data = data;
    } catch (err) {
      console.error('Error loading data:', err);
      state.error = err.message;
      state.data = [];
      
      // Show empty data with error message
      datatableRef.data = [];
      datatableRef.emptyMessage = `Error loading data: ${err.message}`;
    } finally {
      // Clear loading state
      state.loading = false;
      datatableRef.loading = false;
    }
  };
  
  // Load data after the component is rendered
  setTimeout(() => {
    if (datatableRef) {
      loadData();
    }
  }, 100);
  
  return createContainer(html`
    <ae-datatable
      ${ref(r => datatableRef = r)}
      .data=${[]}
      .columns=${columns}
      loading
      loading-text="Loading users from API..."
      empty-message="No data available"
      sortable
      filterable
      enable-column-filters
      dense
    ></ae-datatable>
  `);
};

BasicAPILoading.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates loading data from the JSONPlaceholder API.

Key implementation details:
1. Initialize the datatable with an empty array and loading state
2. Fetch data from the API after the component renders
3. Update the datatable with the fetched data
4. Handle loading state and errors appropriately

The users data is loaded from: https://jsonplaceholder.typicode.com/users
      `
    }
  }
};

// Server-side pagination example with PokeAPI
export const ServerSidePagination = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // State for API pagination
  const state = {
    data: [],
    loading: true,
    error: null,
    totalItems: 0,
    pageSize: 10,
    currentPage: 1
  };
  
  // Define columns for Pokemon data
  const columns = [
    { 
      id: 'id', 
      header: 'ID', 
      sortable: true,
      width: '80px',
      align: 'center',
      renderer: (_, row) => {
        // Extract ID from URL (e.g., https://pokeapi.co/api/v2/pokemon/1/ → 1)
        const id = row.url.split('/').filter(Boolean).pop();
        return html`${id}`;
      }
    },
    { 
      id: 'name', 
      field: 'name', 
      header: 'Name', 
      sortable: true, 
      filterable: true,
      dataType: 'string',
      width: '200px',
      renderer: (value) => {
        // Capitalize the first letter
        return html`${value.charAt(0).toUpperCase() + value.slice(1)}`;
      }
    },
    {
      id: 'details',
      header: 'Details',
      width: '150px',
      renderer: (_, row) => {
        // Extract ID from URL for details link
        const id = row.url.split('/').filter(Boolean).pop();
        return html`
          <a 
            href="https://pokeapi.co/api/v2/pokemon/${id}" 
            target="_blank" 
            style="color: #3b82f6; text-decoration: underline;"
          >
            View Details
          </a>
        `;
      }
    }
  ];
  
  // Function to load paginated data from PokeAPI
  const loadData = async (page = 1, limit = 10) => {
    if (!datatableRef) return;
    
    try {
      // Set loading state
      state.loading = true;
      datatableRef.loading = true;
      
      // Calculate offset based on page number and limit
      const offset = (page - 1) * limit;
      
      // Fetch data from PokeAPI with pagination parameters
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse JSON response
      const result = await response.json();
      
      // Update state with data and metadata
      state.data = result.results;
      state.totalItems = result.count;
      state.currentPage = page;
      state.error = null;
      
      // Update datatable with fetched data
      datatableRef.data = result.results;
      
      // Update pagination information
      datatableRef.rowCount = result.count;
    } catch (err) {
      console.error('Error loading Pokemon data:', err);
      state.error = err.message;
      state.data = [];
      
      // Show empty data with error message
      datatableRef.data = [];
      datatableRef.emptyMessage = `Error loading data: ${err.message}`;
    } finally {
      // Clear loading state
      state.loading = false;
      datatableRef.loading = false;
    }
  };
  
  // Handle page change event
  const handlePageChange = (e) => {
    const { page, pageSize } = e.detail;
    loadData(page, pageSize);
  };
  
  // Load initial data after component is rendered
  setTimeout(() => {
    if (datatableRef) {
      loadData(state.currentPage, state.pageSize);
    }
  }, 100);
  
  return createContainer(html`
    <ae-datatable
      ${ref(r => datatableRef = r)}
      .data=${[]}
      .columns=${columns}
      loading
      loading-text="Loading Pokemon data..."
      empty-message="No data available"
      paginated
      page-size=${state.pageSize}
      manual-pagination
      sortable
      @ae-datatable-page=${handlePageChange}
    ></ae-datatable>
  `);
};

ServerSidePagination.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates server-side pagination with the PokeAPI, where:

1. The datatable is initialized with manual pagination mode
2. Each page change triggers a new API request with offset/limit parameters
3. Total count from the API response updates the pagination controls
4. Only the current page's data is loaded and displayed

The PokeAPI endpoint used is: https://pokeapi.co/api/v2/pokemon

Key features demonstrated:
- Server-side pagination
- Loading state during page transitions
- Handling pagination metadata (total count)
- Preserving state between page changes
      `
    }
  }
};

// Server-side filtering and searching example with GitHub API
export const ServerSideFiltering = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // State for API data
  const state = {
    data: [],
    loading: true,
    error: null,
    searchQuery: 'react',
    totalItems: 0,
    pageSize: 10,
    currentPage: 1
  };
  
  // Define columns for GitHub repositories
  const columns = [
    { 
      id: 'name', 
      field: 'name', 
      header: 'Repository', 
      sortable: true, 
      filterable: true,
      dataType: 'string',
      width: '200px',
      renderer: (value, row) => html`
        <a 
          href="${row.html_url}" 
          target="_blank" 
          style="color: #3b82f6; font-weight: 500; text-decoration: underline;"
        >
          ${value}
        </a>
      `
    },
    { 
      id: 'owner', 
      header: 'Owner', 
      sortable: true,
      width: '180px',
      renderer: (_, row) => html`
        <div style="display: flex; align-items: center; gap: 8px;">
          <img 
            src="${row.owner.avatar_url}" 
            alt="${row.owner.login}" 
            style="width: 24px; height: 24px; border-radius: 50%;"
          />
          <span>${row.owner.login}</span>
        </div>
      `
    },
    { 
      id: 'description', 
      field: 'description', 
      header: 'Description', 
      filterable: true,
      dataType: 'string',
      width: '300px'
    },
    {
      id: 'stars',
      field: 'stargazers_count',
      header: 'Stars',
      sortable: true,
      dataType: 'number',
      width: '100px',
      align: 'right',
      format: (value) => value.toLocaleString()
    },
    {
      id: 'forks',
      field: 'forks_count',
      header: 'Forks',
      sortable: true,
      dataType: 'number',
      width: '100px',
      align: 'right',
      format: (value) => value.toLocaleString()
    },
    {
      id: 'language',
      field: 'language',
      header: 'Language',
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '120px'
    },
    {
      id: 'updated',
      field: 'updated_at',
      header: 'Updated',
      sortable: true,
      dataType: 'date',
      width: '150px',
      format: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }
    }
  ];
  
  // Function to search GitHub repositories
  const searchRepositories = async (query = 'react', page = 1, perPage = 10) => {
    if (!datatableRef) return;
    
    try {
      // Set loading state
      state.loading = true;
      datatableRef.loading = true;
      
      // Build search URL with query, pagination, and sorting
      const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=stars&order=desc`;
      
      // Fetch data from GitHub API
      const response = await fetch(searchUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      // Parse JSON response
      const result = await response.json();
      
      // Update state with repositories and metadata
      state.data = result.items || [];
      state.totalItems = result.total_count || 0;
      state.currentPage = page;
      state.searchQuery = query;
      state.error = null;
      
      // Update datatable with fetched data
      datatableRef.data = state.data;
      datatableRef.rowCount = Math.min(state.totalItems, 1000); // GitHub API limits to 1000 results
    } catch (err) {
      console.error('Error searching GitHub repositories:', err);
      state.error = err.message;
      state.data = [];
      
      // Show empty data with error message
      datatableRef.data = [];
      datatableRef.emptyMessage = `Error searching repositories: ${err.message}`;
    } finally {
      // Clear loading state
      state.loading = false;
      datatableRef.loading = false;
    }
  };
  
  // Handle page change event
  const handlePageChange = (e) => {
    const { page, pageSize } = e.detail;
    searchRepositories(state.searchQuery, page, pageSize);
  };
  
  // Handle global filter change
  const handleFilterChange = (e) => {
    const { globalFilter } = e.detail;
    if (globalFilter !== undefined) {
      // Reset to first page when search changes
      const query = globalFilter.trim() || 'react';
      searchRepositories(query, 1, state.pageSize);
    }
  };
  
  // Initialize search after component is rendered
  setTimeout(() => {
    if (datatableRef) {
      searchRepositories(state.searchQuery, state.currentPage, state.pageSize);
    }
  }, 100);
  
  return createContainer(html`
    <div>
      <div style="padding: 10px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 14px;">
          <strong>Note:</strong> This example demonstrates server-side filtering using the GitHub API. 
          Enter a search term in the filter box to search repositories.
        </p>
      </div>
      <ae-datatable
        ${ref(r => datatableRef = r)}
        .data=${[]}
        .columns=${columns}
        loading
        loading-text="Searching GitHub repositories..."
        empty-message="No repositories found"
        paginated
        page-size=${state.pageSize}
        manual-pagination
        manual-filtering
        sortable
        filterable
        global-filter-value=${state.searchQuery}
        @ae-datatable-page=${handlePageChange}
        @ae-datatable-filter=${handleFilterChange}
      ></ae-datatable>
    </div>
  `);
};

ServerSideFiltering.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates server-side filtering/searching with the GitHub Search API.

Key features:
1. Global filter input triggers API searches with the provided query
2. Server-side pagination of results
3. Proper handling of API rate limits and restrictions
4. Integration with GitHub's search parameters

GitHub Search API: https://api.github.com/search/repositories

Implementation notes:
- The search is performed against GitHub's repository search endpoint
- Results are limited to 1000 items (GitHub API restriction)
- The search defaults to "react" if no query is provided
      `
    }
  }
};

// Server-side sorting example
export const ServerSideSorting = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // State for API data
  const state = {
    data: [],
    loading: true,
    error: null,
    sortField: 'name',
    sortOrder: 'asc',
    pageSize: 10,
    currentPage: 1
  };
  
  // Define columns for JSONPlaceholder comments data
  const columns = [
    { 
      id: 'id', 
      field: 'id', 
      header: 'ID', 
      sortable: true,
      width: '80px',
      align: 'center'
    },
    { 
      id: 'postId', 
      field: 'postId', 
      header: 'Post ID', 
      sortable: true,
      width: '100px',
      align: 'center'
    },
    { 
      id: 'name', 
      field: 'name', 
      header: 'Name', 
      sortable: true, 
      filterable: true,
      dataType: 'string',
      width: '250px'
    },
    { 
      id: 'email', 
      field: 'email', 
      header: 'Email', 
      sortable: true,
      filterable: true,
      dataType: 'string',
      width: '200px',
      renderer: (value) => html`
        <a href="mailto:${value}" style="color: #3b82f6; text-decoration: underline;">
          ${value}
        </a>
      `
    },
    {
      id: 'body',
      field: 'body',
      header: 'Comment',
      filterable: true,
      dataType: 'string',
      width: '400px'
    }
  ];
  
  // Function to load and sort data from JSONPlaceholder
  const loadAndSortData = async (sortField = 'name', sortOrder = 'asc', page = 1, limit = 10) => {
    if (!datatableRef) return;
    
    try {
      // Set loading state
      state.loading = true;
      datatableRef.loading = true;
      
      // In a real API, you would include sort parameters in the request
      // JSONPlaceholder doesn't support sorting, so we'll fetch all and sort client-side
      const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=50');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse JSON response
      let allData = await response.json();
      
      // Sort data according to parameters (simulating server-side sorting)
      allData.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        // Handle different data types
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else {
          // Numeric sort
          return sortOrder === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        }
      });
      
      // Get paginated data
      const startIndex = (page - 1) * limit;
      const paginatedData = allData.slice(startIndex, startIndex + limit);
      
      // Update state with sorted data
      state.data = paginatedData;
      state.totalItems = allData.length;
      state.currentPage = page;
      state.sortField = sortField;
      state.sortOrder = sortOrder;
      state.error = null;
      
      // Update datatable with fetched data
      datatableRef.data = paginatedData;
      datatableRef.rowCount = allData.length;
      
      // Update sorting state
      const sortDirection = sortOrder === 'asc' ? 'asc' : 'desc';
      datatableRef.sorting = [{ id: sortField, desc: sortDirection === 'desc' }];
    } catch (err) {
      console.error('Error loading data:', err);
      state.error = err.message;
      state.data = [];
      
      // Show empty data with error message
      datatableRef.data = [];
      datatableRef.emptyMessage = `Error loading data: ${err.message}`;
    } finally {
      // Clear loading state
      state.loading = false;
      datatableRef.loading = false;
    }
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    const { sortState } = e.detail;
    
    if (sortState && sortState.length > 0) {
      const { id, direction } = sortState[0];
      loadAndSortData(id, direction, state.currentPage, state.pageSize);
    } else {
      // If no sort specified, use default
      loadAndSortData('name', 'asc', state.currentPage, state.pageSize);
    }
  };
  
  // Handle page change
  const handlePageChange = (e) => {
    const { page, pageSize } = e.detail;
    loadAndSortData(state.sortField, state.sortOrder, page, pageSize);
  };
  
  // Load initial data after component is rendered
  setTimeout(() => {
    if (datatableRef) {
      loadAndSortData(state.sortField, state.sortOrder, state.currentPage, state.pageSize);
    }
  }, 100);
  
  return createContainer(html`
    <ae-datatable
      ${ref(r => datatableRef = r)}
      .data=${[]}
      .columns=${columns}
      loading
      loading-text="Loading and sorting data..."
      empty-message="No data available"
      paginated
      page-size=${state.pageSize}
      manual-pagination
      manual-sorting
      sortable
      enable-multi-sort=${false}
      @ae-datatable-sort=${handleSortChange}
      @ae-datatable-page=${handlePageChange}
    ></ae-datatable>
  `);
};

ServerSideSorting.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates server-side sorting:

1. The datatable is configured with manual sorting mode
2. Sorting a column triggers a server request with sort parameters
3. The server returns sorted data based on the requested field and direction

Note: Since JSONPlaceholder doesn't natively support sorting, we simulate server-side sorting by
fetching all data and sorting it client-side. In a real implementation, you would pass sorting
parameters to your API endpoint.

Key features:
- Server-side sorting by different columns
- Integration with pagination
- Handling of different data types in sorting
- Visual indication of sorted columns
      `
    }
  }
};

// Complete integration example with public API, supporting all server-side operations
export const CompleteAPIIntegration = () => {
  ensureDataTableComponents();
  
  // Reference to the datatable element
  let datatableRef;
  
  // State for the complete example
  const state = {
    data: [],
    loading: true,
    error: null,
    searchTerm: '',
    sortBy: 'id',
    sortDir: 'asc',
    page: 1,
    pageSize: 5,
    totalItems: 0,
    filters: {}
  };
  
  // Columns for JSONPlaceholder posts data
  const columns = [
    { 
      id: 'id', 
      field: 'id', 
      header: 'ID', 
      sortable: true,
      width: '80px',
      align: 'center'
    },
    { 
      id: 'userId', 
      field: 'userId', 
      header: 'User ID', 
      sortable: true,
      width: '100px',
      align: 'center'
    },
    { 
      id: 'title', 
      field: 'title', 
      header: 'Title', 
      sortable: true, 
      filterable: true,
      dataType: 'string',
      width: '300px'
    },
    {
      id: 'body',
      field: 'body',
      header: 'Content',
      filterable: true,
      dataType: 'string',
      width: '400px'
    },
    {
      id: 'actions',
      header: 'Actions',
      width: '150px',
      renderer: (_, row) => html`
        <div style="display: flex; gap: 8px;">
          <button 
            style="padding: 4px 8px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click=${() => alert(`View post ${row.id}`)}
          >
            View
          </button>
          <button 
            style="padding: 4px 8px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click=${() => alert(`Delete post ${row.id}`)}
          >
            Delete
          </button>
        </div>
      `
    }
  ];
  
  // Function to fetch data with all parameters (sort, filter, pagination)
  const fetchData = async () => {
    if (!datatableRef) return;
    
    try {
      // Set loading state
      state.loading = true;
      datatableRef.loading = true;
      
      // In a real app, you would pass all these parameters to your API
      // Constructing URL with all available parameters
      let url = `https://jsonplaceholder.typicode.com/posts?_page=${state.page}&_limit=${state.pageSize}`;
      
      // Add sorting if specified
      if (state.sortBy) {
        url += `&_sort=${state.sortBy}&_order=${state.sortDir}`;
      }
      
      // Add search term if specified (JSONPlaceholder supports q parameter)
      if (state.searchTerm) {
        url += `&q=${encodeURIComponent(state.searchTerm)}`;
      }
      
      // Fetch data
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse response
      const data = await response.json();
      
      // Get total count from headers if available (JSONPlaceholder provides X-Total-Count)
      const totalCount = response.headers.get('X-Total-Count');
      state.totalItems = totalCount ? parseInt(totalCount, 10) : 100; // Fallback value
      
      // Update state and datatable
      state.data = data;
      state.error = null;
      
      datatableRef.data = data;
      datatableRef.rowCount = state.totalItems;
      
      // Update sorting state in datatable
      if (state.sortBy) {
        datatableRef.sorting = [{ id: state.sortBy, desc: state.sortDir === 'desc' }];
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      state.error = err.message;
      state.data = [];
      
      // Show error in datatable
      datatableRef.data = [];
      datatableRef.emptyMessage = `Error loading data: ${err.message}`;
    } finally {
      // Clear loading state
      state.loading = false;
      datatableRef.loading = false;
    }
  };
  
  // Handle all events from datatable
  
  // Handle sort change
  const handleSortChange = (e) => {
    const { sorting } = e.detail;
    
    if (sorting && sorting.length > 0) {
      state.sortBy = sorting[0].id;
      state.sortDir = sorting[0].desc ? 'desc' : 'asc';
    } else {
      // Default sorting if cleared
      state.sortBy = 'id';
      state.sortDir = 'asc';
    }
    
    // Reload data with new sort parameters
    fetchData();
  };
  
  // Handle page change
  const handlePageChange = (e) => {
    const { page, pageSize } = e.detail;
    state.page = page;
    state.pageSize = pageSize;
    
    // Reload data with new pagination parameters
    fetchData();
  };
  
  // Handle filter change
  const handleFilterChange = (e) => {
    const { globalFilter, columnFilters } = e.detail;
    
    // Handle global search
    if (globalFilter !== undefined) {
      state.searchTerm = globalFilter;
    }
    
    // Handle column filters (note: JSONPlaceholder doesn't support complex filtering)
    if (columnFilters) {
      state.filters = columnFilters.reduce((acc, filter) => {
        acc[filter.id] = filter.value;
        return acc;
      }, {});
    }
    
    // Reset to first page when filtering changes
    state.page = 1;
    
    // Reload data with new filter parameters
    fetchData();
  };
  
  // Load initial data after component is rendered
  setTimeout(() => {
    if (datatableRef) {
      fetchData();
    }
  }, 100);
  
  // Add a refresh button for manual data reload
  const handleRefresh = () => {
    if (datatableRef) {
      fetchData();
    }
  };
  
  // Add an error trigger for demonstration
  const triggerError = () => {
    if (datatableRef) {
      state.error = 'Simulated API error for demonstration';
      datatableRef.data = [];
      datatableRef.emptyMessage = `Error: ${state.error}`;
      datatableRef.loading = false;
    }
  };
  
  return html`
    <div style="padding: 10px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <div style="margin-bottom: 16px;">
        <h2 style="margin-top: 0; font-size: 18px;">Complete API Integration Example</h2>
        <p>
          This example demonstrates a complete integration with the JSONPlaceholder API,
          supporting server-side operations for sorting, filtering, and pagination.
        </p>
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button 
            style="padding: 6px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click=${handleRefresh}
          >
            Refresh Data
          </button>
          <button 
            style="padding: 6px 12px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
            @click=${triggerError}
          >
            Simulate Error
          </button>
        </div>
      </div>
      
      ${createContainer(html`
        <ae-datatable
          ${ref(r => datatableRef = r)}
          .data=${[]}
          .columns=${columns}
          loading
          loading-text="Loading data from API..."
          empty-message="No data available"
          sortable
          filterable
          enable-column-filters
          paginated
          page-size=${state.pageSize}
          enable-multi-sort=${false}
          manual-sorting
          manual-filtering
          manual-pagination
          @ae-datatable-sort=${handleSortChange}
          @ae-datatable-filter=${handleFilterChange}
          @ae-datatable-page=${handlePageChange}
        ></ae-datatable>
      `)}
      
      <div style="margin-top: 16px; padding: 12px; background-color: #f8fafc; border-radius: 4px;">
        <p style="margin-top: 0; font-weight: 500;">Integration details:</p>
        <ul style="margin-bottom: 0;">
          <li>API endpoint: JSONPlaceholder Posts</li>
          <li>Server-side sorting by column</li>
          <li>Server-side filtering with global search</li>
          <li>Server-side pagination with dynamic page size</li>
          <li>Error handling and loading states</li>
          <li>Manual refresh capability</li>
        </ul>
      </div>
    </div>
  `;
};

CompleteAPIIntegration.parameters = {
  docs: {
    description: {
      story: `
This comprehensive example demonstrates a complete API integration with all server-side operations:

1. Server-side sorting: Clicking column headers sends sort parameters to the API
2. Server-side filtering: Search input sends filter parameters to the API
3. Server-side pagination: Page navigation sends pagination parameters to the API
4. Error handling: Demonstrates handling API errors gracefully
5. Loading states: Shows loading indicators during data operations

This implementation uses the JSONPlaceholder API, which supports:
- Pagination with _page and _limit parameters
- Sorting with _sort and _order parameters
- Searching with the q parameter
- Provides X-Total-Count header for total records

In a real-world application, you would adapt these patterns to match your specific API's requirements.
      `
    }
  }
};