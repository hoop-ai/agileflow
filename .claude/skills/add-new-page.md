---
name: add-new-page
description: Create a new page in the AgileFlow app with proper routing, layout integration, and optional navigation link
---

## Steps to Add a New Page

1. **Create the page component** at `src/pages/<PageName>.jsx`
   - Default export the component
   - Include loading state with spinner
   - Use Supabase entity services for data
   - Follow existing page patterns (see Dashboard.jsx)

2. **Register in pages.config.js**
   ```js
   import NewPage from './pages/NewPage';
   // Add to PAGES object:
   "NewPage": NewPage,
   ```

3. **Add navigation (optional)** in `src/Layout.jsx`
   - Add entry to `navigationItems` array with title, url, and lucide icon

4. **Link from other pages (optional)**
   ```jsx
   import { createPageUrl } from "@/utils";
   <Link to={createPageUrl("NewPage")}>Go to New Page</Link>
   ```

5. **Verify**
   - `npm run lint && npm run build`
