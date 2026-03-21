---
name: add-board-column
description: Add a new column type to the board system with its cell component, column definition, and integration into the board view
---

## Steps to Add a New Board Column Type

1. **Create the cell component** in `src/components/board/cells/<Type>Cell.jsx`
   - Accept props: `value`, `onChange`, `column`, `item`
   - Use shadcn primitives for the input/display
   - Include dark mode styling
   - Handle both view and edit modes

2. **Register the cell** in `src/components/board/ItemRow.jsx`
   - Import the new cell component
   - Add it to the column type → component mapping

3. **Add column creation support** in `src/components/board/NewColumnModal.jsx`
   - Add the new type to the available column types list
   - Add any type-specific configuration fields

4. **Update board data handling** in `src/pages/Board.jsx`
   - Ensure the new column type is handled in data save/load
   - Add default value handling for new items

5. **Test**
   - `npm run lint` to check for import/unused issues
   - `npm run build` to verify compilation
