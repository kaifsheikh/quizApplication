// =================== EXISTING RESTRICTIONS ===================
  // 1. Right-click disable
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // 2. Keyboard shortcuts disable (F12, DevTools, Ctrl+U, etc.)
  document.addEventListener('keydown', function(e) {
    // Helper to block and stop propagation
    function block() {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }

    // F12
    if (e.key === 'F12' || e.keyCode === 123) return block();
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) return block();
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) return block();
    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) return block();
    // Ctrl+U
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) return block();

    // --- Block Ctrl+T (new tab) & Ctrl+N (new window) ---
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 't' || e.key === 'T' || e.keyCode === 84)) return block();
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'n' || e.key === 'N' || e.keyCode === 78)) return block();

    // --- Block Copy/Cut shortcuts ---
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) return block();
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'x' || e.key === 'X' || e.keyCode === 88)) return block();
    if (e.ctrlKey && (e.key === 'Insert' || e.keyCode === 45)) return block();
  });

  // Capture phase – extra layer to catch shortcuts early
  window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && (e.key === 't' || e.key === 'T' || e.keyCode === 84)) ||
        (e.ctrlKey && (e.key === 'n' || e.key === 'N' || e.keyCode === 78))) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);

  // 3. Block copy/cut events
  document.addEventListener('copy', function(e) { e.preventDefault(); });
  document.addEventListener('cut', function(e) { e.preventDefault(); });

  // =================== PREVENT NEW TAB FROM MOUSE ===================
  // A. Ctrl+Click / Cmd+Click (macOS) ya Middle-click on links
  function preventNewTabFromClick(e) {
    var link = e.target.closest('a');
    if (link) {
      // Block if modifier keys used OR link has target="_blank"
      if (e.ctrlKey || e.metaKey || e.button === 1 || link.getAttribute('target') === '_blank') {
        e.preventDefault();
        e.stopPropagation();
        // Optional: agar aap chahte hain ki link same tab mein khule toh ye line add karein:
        // window.location.href = link.href;
        return false;
      }
    }
  }

  document.addEventListener('click', preventNewTabFromClick, true);
  document.addEventListener('auxclick', function(e) {
    if (e.button === 1) preventNewTabFromClick(e);
  }, true);

  // B. Remove target="_blank" from all existing links
  document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
    link.removeAttribute('target');
  });

  // C. Watch for dynamically added links (MutationObserver)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
            node.removeAttribute('target');
          }
          // Also check inside added subtree
          if (node.querySelectorAll) {
            node.querySelectorAll('a[target="_blank"]').forEach(function(link) {
              link.removeAttribute('target');
            });
          }
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // D. Block window.open (programmatic new tabs)
  (function() {
    var originalOpen = window.open;
    window.open = function() {
      console.warn('window.open blocked');
      return null;
    };
  })();

  // E. Disable text selection (copy mushkil banane ke liye)
  var style = document.createElement('style');
  style.textContent = `
    * {
      user-select: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
    }
  `;
  document.head.appendChild(style);