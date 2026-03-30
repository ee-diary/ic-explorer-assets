// 50px filter padding fix to prevent vertical shift when pins are clicked
const filterPadding = 50;
const adjustedWidth = originalWidth + filterPadding;
const adjustedHeight = originalHeight + filterPadding;

// Apply dimensions to the filter
filter.style.width = adjustedWidth + 'px';
filter.style.height = adjustedHeight + 'px';

// ... other lines of your current dip-renderer.js code
// ... (lines 79-94)