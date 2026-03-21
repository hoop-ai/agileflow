---
name: add-dashboard-widget
description: Create a new dashboard widget component and integrate it into the Dashboard page
---

## Steps to Add a Dashboard Widget

1. **Create widget component** at `src/components/dashboard/<WidgetName>.jsx`
   - Use shadcn Card as container
   - Accept data props from Dashboard page
   - Include loading skeleton state
   - Support dark mode

2. **Integrate into Dashboard** in `src/pages/Dashboard.jsx`
   - Import the widget component
   - Load required data in `loadDashboardData()`
   - Place widget in the dashboard grid layout

3. **Widget template**
   ```jsx
   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

   export default function MyWidget({ data, isLoading }) {
     if (isLoading) {
       return <Card><CardContent className="h-48 animate-pulse bg-gray-100 dark:bg-gray-800" /></Card>;
     }
     return (
       <Card className="dark:bg-gray-800 dark:border-gray-700">
         <CardHeader>
           <CardTitle className="dark:text-white">Widget Title</CardTitle>
         </CardHeader>
         <CardContent>{/* widget content */}</CardContent>
       </Card>
     );
   }
   ```

4. **Verify**: `npm run lint && npm run build`
