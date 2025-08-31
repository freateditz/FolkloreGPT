import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Simple and safe ResizeObserver error suppression
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
    return; // Suppress ResizeObserver errors only
  }
  originalConsoleError.apply(console, args);
};

// Simple error handler for ResizeObserver errors
window.addEventListener('error', (e) => {
  if (e.message && e.message.includes('ResizeObserver')) {
    e.preventDefault();
    return false;
  }
});

console.log('✅ Simple ResizeObserver error suppression initialized');

// Additional error boundary for the entire application
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a ResizeObserver error
    if (error.message && error.message.includes('ResizeObserver')) {
      return null; // Don't update state for ResizeObserver errors
    }
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Filter out ResizeObserver errors
    if (error.message && error.message.includes('ResizeObserver')) {
      return; // Don't log ResizeObserver errors
    }
    console.error('Global error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          color: '#b91c1c',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>,
);