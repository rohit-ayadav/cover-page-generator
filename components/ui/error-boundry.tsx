import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Return a beautiful error message
            return (
                <div className="text-center p-8">
                    <h1 className="text-3xl font-bold text-red-500">Something went wrong!</h1>
                    <p className="text-lg text-gray-600">Please refresh the page and try again.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
