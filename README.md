# Glaut's nested menu

This repository refers to the challenge sent from Glaut to create a nested menu
following certain conditions listed below.

## Objective

Build a React component with these features:

1. Add Top-Level Items: Users can add new items at the top level of the list.
2. Add Nested Items: Users can add new items nested within existing items. For
   example, clicking an "Add Child" button within an item should add a nested child
   item.
3. Edit Item Names: Users can click on an item’s name to edit it. The changes
   should be reflected in the state.
4. State Representation: The component’s state should be a nested JSON array
   that reflects the hierarchical structure of the list. Each item in the JSON
   should have a name and a children array.

## Requirements

- UI/UX: Clean and smooth, but keep it simple.
- Testing: Write tests using your preferred framework.
- Code: Compact, well-commented code.
- Bonus: Add a maximum nesting level of 3.

## How to run

To run in development, run the following:

```bash
npm run dev
```

and open `http://localhost:3000` in the browser.

To run in production, run:

```bash
npm run build
```

and open or serve the file `index.html` under the folder `dist`.
