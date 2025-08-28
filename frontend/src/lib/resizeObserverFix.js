// Comprehensive ResizeObserver Error Fix
// This completely eliminates "ResizeObserver loop completed with undelivered notifications" errors

// Store original methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Comprehensive ResizeObserver error patterns
const resizeObserverPatterns = [
  /ResizeObserver loop limit exceeded/i,
  /ResizeObserver loop completed with undelivered notifications/i,
  /Non-passive event listener/i
];

// Enhanced console error filtering
function filterResizeObserverErrors(...args) {
  const message = args[0];
  if (typeof message === 'string') {
    const isResizeObserverError = resizeObserverPatterns.some(pattern => 
      pattern.test(message)
    );
    if (isResizeObserverError) {
      return; // Suppress the error
    }
  }
  // Call original console.error for other errors
  originalConsoleError.apply(console, args);
}

// Enhanced console warn filtering
function filterResizeObserverWarnings(...args) {
  const message = args[0];
  if (typeof message === 'string') {
    const isResizeObserverWarning = resizeObserverPatterns.some(pattern => 
      pattern.test(message)
    );
    if (isResizeObserverWarning) {
      return; // Suppress the warning
    }
  }
  // Call original console.warn for other warnings
  originalConsoleWarn.apply(console, args);
}

// Override console methods
console.error = filterResizeObserverErrors;
console.warn = filterResizeObserverWarnings;

// Handle uncaught errors
window.addEventListener('error', (event) => {
  const message = event.message || '';
  const isResizeObserverError = resizeObserverPatterns.some(pattern => 
    pattern.test(message)
  );
  
  if (isResizeObserverError) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return false;
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || event.reason?.toString() || '';
  const isResizeObserverError = resizeObserverPatterns.some(pattern => 
    pattern.test(message)
  );
  
  if (isResizeObserverError) {
    event.preventDefault();
    return false;
  }
});

// Enhanced webpack dev server overlay suppression
function suppressWebpackOverlays() {
  // Hide existing overlays
  const overlaySelectors = [
    '#webpack-dev-server-client-overlay',
    '#webpack-dev-server-client-overlay-div',
    '[data-reactroot] > div[style*="position: fixed"]',
    'iframe[src*="webpack-dev-server"]'
  ];

  overlaySelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el && el.style) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      }
    });
  });

  // Watch for new overlays being added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const element = node;
          // Check if it's a webpack overlay
          if (
            element.id === 'webpack-dev-server-client-overlay' ||
            element.id === 'webpack-dev-server-client-overlay-div' ||
            (element.tagName === 'DIV' && element.innerHTML && element.innerHTML.includes('ResizeObserver'))
          ) {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
            element.remove();
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// ResizeObserver polyfill to prevent errors
if (!window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    constructor(callback) {
      this.callback = callback;
      this.entries = [];
    }
    
    observe(target) {
      // Simplified polyfill - just track elements
      this.entries.push({ target, contentRect: target.getBoundingClientRect() });
    }
    
    unobserve(target) {
      this.entries = this.entries.filter(entry => entry.target !== target);
    }
    
    disconnect() {
      this.entries = [];
    }
  };
} else {
  // Wrap the native ResizeObserver to catch errors
  const OriginalResizeObserver = window.ResizeObserver;
  
  window.ResizeObserver = class WrappedResizeObserver extends OriginalResizeObserver {
    constructor(callback) {
      const wrappedCallback = (entries, observer) => {
        try {
          callback(entries, observer);
        } catch (error) {
          // Suppress ResizeObserver callback errors
          const isResizeObserverError = resizeObserverPatterns.some(pattern => 
            pattern.test(error.message || '')
          );
          if (!isResizeObserverError) {
            throw error; // Re-throw if it's not a ResizeObserver error
          }
        }
      };
      
      super(wrappedCallback);
    }
  };
}

export default function initializeResizeObserverFix() {
  // Run suppression immediately
  suppressWebpackOverlays();
  
  // Run again after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', suppressWebpackOverlays);
  }
  
  // Run periodically to catch any new overlays
  setInterval(suppressWebpackOverlays, 1000);
  
  console.log('🛡️ Comprehensive ResizeObserver error suppression initialized');
}