# Workflow Builder

A sophisticated visual workflow builder application built with React and Vite. Create, edit, and manage complex workflows with an intuitive node-based interface featuring actions, conditional branches, and end states.

![Workflow Builder Demo](https://via.placeholder.com/800x400/16a34a/ffffff?text=Workflow+Builder+Demo)

## 🚀 Features

### Core Functionality
- **Visual Workflow Creation**: Build workflows using a node-based interface
- **Real-time Editing**: Modify workflows with immediate visual feedback
- **Undo/Redo System**: Full history management for safe editing
- **Workflow Persistence**: Save and load workflow configurations

### Node Types
- **Action Nodes**: Represent executable steps or tasks in your workflow
  - Can be edited, deleted, and extended
  - Support adding subsequent actions or branches
- **Branch Nodes**: Create conditional logic with true/false paths
  - Split workflow execution based on conditions
  - Each branch can contain complex sub-workflows
- **End Nodes**: Mark the completion of workflow paths
  - Terminate workflow execution
  - Can represent success, failure, or other end states

### Interactive Features
- **Direct Label Editing**: Click any node to edit its label inline
- **Dynamic Node Addition**:
  - Add action steps after existing nodes
  - Insert conditional branches at any point
- **Node Management**: Delete unnecessary nodes while preserving workflow integrity
- **Visual Feedback**: Clean, modern UI with gradient styling and smooth transitions

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0 with Hooks
- **Build Tool**: Vite 7.2.4 for fast development and optimized builds
- **Styling**: Pure CSS with modern design patterns
- **Code Quality**: ESLint with React-specific rules
- **Type Safety**: TypeScript definitions for React components

## 📋 Prerequisites

- **Node.js**: Version 16.0.0 or higher
- **Package Manager**: npm (comes with Node.js) or yarn
- **Browser**: Modern browser with ES6+ support

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workflow-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📖 Usage Guide

### Creating Your First Workflow

1. **Start with the Default Workflow**
   - The application loads with a sample workflow: Start → Send Email → User Paid? → Thank You/Ask to Pay

2. **Edit Node Labels**
   - Click on any node's text field to edit its label
   - Changes are reflected immediately

3. **Add New Actions**
   - Click the **"+"** button on action nodes to add new steps
   - New nodes are inserted between the current node and its successor

4. **Create Conditional Logic**
   - Click the **"⇄"** button on action nodes to add branches
   - This creates a condition node with True and False paths

5. **Remove Nodes**
   - Use the **🗑️** button to delete nodes
   - The workflow automatically reconnects to maintain integrity

### Advanced Workflow Patterns

#### Sequential Workflows
```
Start → Action 1 → Action 2 → Action 3 → End
```

#### Conditional Workflows
```
Start → Check Condition → [True: Action A] [False: Action B] → End
```

#### Complex Branching
```
Start → Initial Action → Condition 1
├── True → Sub-action → Condition 2
│   ├── True → Final Action A → End
│   └── False → Final Action B → End
└── False → Alternative Action → End
```

### Saving and Loading Workflows

- **Save**: Click the "Save" button to log the current workflow to the browser console
- **Data Format**: Workflows are stored as JSON objects with the following structure:

```json
{
  "startNodeId": "1",
  "nodes": {
    "1": {
      "id": "1",
      "type": "action",
      "label": "Start",
      "children": { "main": "2" }
    },
    "2": {
      "id": "2",
      "type": "branch",
      "label": "User Paid?",
      "children": { "true": "3", "false": "4" }
    }
  }
}
```

## 🏗️ Architecture

### Component Structure

```
App.jsx (Main Container)
├── Workflow State Management
├── Undo/Redo Logic
└── Node Renderer

Node.jsx (Node Component)
├── Node Display Logic
├── Action Handlers (Add/Delete/Edit)
└── Child Node Rendering
```

### State Management

The application uses React's `useState` hook for state management:

- **`workflow`**: Current workflow structure
- **`history`**: Array of previous workflow states for undo
- **`future`**: Array of future states for redo

### Node Data Structure

Each node in the workflow follows this structure:

```javascript
{
  id: string,        // Unique identifier
  type: string,      // "action" | "branch" | "end"
  label: string,     // Display text
  children: object   // Child node references
}
```

- **Action nodes**: `children: { main: "nextNodeId" }`
- **Branch nodes**: `children: { true: "trueNodeId", false: "falseNodeId" }`
- **End nodes**: `children: {}`

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Code Style

This project uses ESLint with the following configurations:
- React Hooks rules
- React Refresh for fast refresh support
- Standard JavaScript best practices

### Adding New Features

1. **New Node Types**
   - Add the type to the node creation logic in `Node.jsx`
   - Update the rendering logic to handle the new type
   - Add appropriate UI controls

2. **New Actions**
   - Extend the action handlers in `Node.jsx`
   - Update the workflow state structure if needed
   - Add UI buttons and event handlers

## 🐛 Troubleshooting

### Common Issues

**Application won't start**
- Ensure Node.js version is 16+
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Nodes not rendering correctly**
- Check browser console for JavaScript errors
- Verify the workflow state structure is valid

**Undo/Redo not working**
- Ensure you're not at the beginning/end of history
- Check that state updates are properly triggering re-renders

### Development Tips

- Use browser developer tools to inspect the workflow state
- The "Save" button logs the current state to console for debugging
- Node IDs are generated using `Date.now()` for uniqueness

## 📁 Project Structure

```
workflow-builder/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
├── src/                      # Source code
│   ├── assets/               # Asset files
│   ├── component/            # React components
│   │   └── Node.jsx          # Workflow node component
│   ├── App.jsx               # Main application component
│   ├── App.css               # Component styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

## 🚀 Future Enhancements

### Planned Features
- [ ] **Drag and Drop**: Visual node positioning and rearrangement
- [ ] **Export/Import**: Save workflows to JSON/YAML files
- [ ] **Workflow Validation**: Check for logical errors and dead ends
- [ ] **Custom Node Types**: User-defined node categories
- [ ] **Collaboration**: Real-time multi-user editing
- [ ] **Execution Engine**: Run workflows with actual logic
- [ ] **Templates**: Pre-built workflow templates
- [ ] **Version Control**: Track workflow changes over time

### Technical Improvements
- [ ] **TypeScript Migration**: Full type safety
- [ ] **State Persistence**: Local storage or database integration
- [ ] **Performance Optimization**: Virtual scrolling for large workflows
- [ ] **Accessibility**: ARIA labels and keyboard navigation
- [ ] **Testing**: Unit and integration tests
- [ ] **Documentation**: API documentation and guides

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run linting**
   ```bash
   npm run lint
   ```
5. **Test your changes**
6. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation for new features
- Ensure all linting passes
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Inspired by modern workflow automation tools
- Icons and styling inspired by modern design systems

## 📞 Support

If you have questions or need help:

1. Check the [Issues](https://github.com/your-repo/workflow-builder/issues) page
2. Create a new issue with detailed information
3. Include screenshots and error messages when possible

---

**Happy Workflow Building!** 🎉
