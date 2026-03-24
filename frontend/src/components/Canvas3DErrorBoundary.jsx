import React from "react";

class Canvas3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Silently catch R3F errors — 3D is enhancement only
    console.warn("3D component failed to render:", error.message);
  }

  render() {
    if (this.state.hasError) {
      // Render nothing or a subtle fallback
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export default Canvas3DErrorBoundary;
