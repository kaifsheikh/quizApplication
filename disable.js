  // --- Existing restrictions ---
  // 1. Right-click disable
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // 2. F12, Ctrl+Shift+I/J/C, Ctrl+U disable
  // 3. **ADDED:** Ctrl+T (new tab), Ctrl+N (new window), Ctrl+C (copy), Ctrl+X (cut)
  document.addEventListener('keydown', function(e) {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Element selector)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View page source)
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }

    // --- 🚀 New restrictions (copy & new tab) ---

    // Ctrl+T (new tab)
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 't' || e.key === 'T' || e.keyCode === 84)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+N (new window)
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'n' || e.key === 'N' || e.keyCode === 78)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+C (copy)
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+X (cut)
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'x' || e.key === 'X' || e.keyCode === 88)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Insert (copy alternative)
    if (e.ctrlKey && (e.key === 'Insert' || e.keyCode === 45)) {
      e.preventDefault();
      return false;
    }
  });

  // --- 🚀 Additional block for copy/paste events ---
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
  });
  document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
  });

  // --- 🚀 Prevent opening links in new tab via Ctrl+Click or Middle-click ---
  document.addEventListener('click', function(e) {
    if (e.ctrlKey || e.metaKey) { // Ctrl on Windows/Linux, Cmd on Mac
      var link = e.target.closest('a');
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, true);

  document.addEventListener('auxclick', function(e) {
    if (e.button === 1) { // Middle mouse button
      var link = e.target.closest('a');
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, true);

  // --- 🚀 Disable text selection (makes copying harder) ---
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