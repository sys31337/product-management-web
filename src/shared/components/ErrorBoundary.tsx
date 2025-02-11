import React, { Component } from 'react';

// Define a type or interface for the props
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Define a type for the state
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={'w-full h-full justify-center align-middle'}>
          <div>
            <p color={'gray.600'}>500</p>
            <p color={'gray.600'}>Une erreur est survenue</p>
            <p color={'gray.600'}>veuillez réessayer ultérieurement</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
