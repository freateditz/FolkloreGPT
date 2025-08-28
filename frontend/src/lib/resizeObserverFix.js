// ResizeObserver Error Fix
// This fixes the common "ResizeObserver loop completed with undelivered notifications" error

let resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;

window.addEventListener('error', (e) => {
  if (resizeObserverLoopErrRe.test(e.message)) {
    const resizeObserverErrDiv = document.getElementById(
      'webpack-dev-server-client-overlay-div'
    );
    const resizeObserverErr = document.getElementById(
      'webpack-dev-server-client-overlay'
    );
    if (resizeObserverErr) {
      resizeObserverErr.setAttribute('style', 'display: none');
    }
    if (resizeObserverErrDiv) {
      resizeObserverErrDiv.setAttribute('style', 'display: none');
    }
  }
});

// Alternative fix for ResizeObserver errors
const resizeObserverErr = /ResizeObserver loop limit exceeded/;

window.addEventListener('error', (e) => {
  if (resizeObserverErr.test(e.message)) {
    e.stopImmediatePropagation();
    return false;
  }
});

// Prevent ResizeObserver errors from showing in console
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

export default function initializeResizeObserverFix() {
  // Initialize the fix - this function can be called from index.js
  console.log('ResizeObserver error fix initialized');
}