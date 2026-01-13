# Workflow Builder

A visual workflow builder application built with React and Vite. Create, edit, and manage complex workflows with an intuitive drag-and-drop interface featuring nodes, branches, and conditional logic.

## Features

- **Visual Workflow Creation**: Build workflows using a node-based interface
- **Multiple Node Types**:
  - **Action Nodes**: Represent steps or tasks in your workflow
  - **Branch Nodes**: Create conditional logic with true/false paths
  - **End Nodes**: Mark the completion of workflow paths
- **Interactive Editing**:
  - Edit node labels directly
  - Add new action steps after existing nodes
  - Insert conditional branches at any point
  - Delete unnecessary nodes
- **Workflow Management**:
  - Undo/Redo functionality for easy editing
  - Save workflow (currently logs to console)
- **Responsive Design**: Clean, modern UI with gradient styling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd workflow-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating a Workflow

1. **Start Node**: Every workflow begins with a predefined start node
2. **Add Actions**: Click the "+" button on action nodes to add new steps
3. **Add Branches**: Click the "⇄" button on action nodes to create conditional logic
4. **Edit Labels**: Click on any node label to edit it
5. **Delete Nodes**: Use the trash icon to remove nodes (except the start node)

### Workflow Structure

- **Action Nodes**: Have a single "main" path to the next node
- **Branch Nodes**: Split into "true" and "false" paths
- **End Nodes**: Terminate workflow paths

### Saving Your Work

Click the "Save" button to log the current workflow structure to the console. The workflow data includes:
- Node definitions with IDs, types, labels, and children
- Complete workflow state for persistence

## Project Structure

```
workflow-builder/
├── public/
├── src/
│   ├── assets/
│   ├── component/
│   │   └── Node.jsx          # Individual workflow node component
│   ├── App.jsx               # Main application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **CSS** - Styling

## Future Enhancements

- [ ] Drag and drop node positioning
- [ ] Export workflows to JSON/YAML
- [ ] Import workflows from files
- [ ] Workflow validation
- [ ] Custom node types
- [ ] Collaboration features
- [ ] Workflow execution engine

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
