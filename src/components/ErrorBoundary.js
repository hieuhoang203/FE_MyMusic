import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <ErrorFallback 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })}
        />
      );
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error, errorInfo, resetError }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetError();
    navigate(ROUTES.HOME);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={[
          <Button type="primary" key="home" onClick={handleGoHome}>
            Go Home
          </Button>,
          <Button key="reload" onClick={handleReload}>
            Reload Page
          </Button>,
        ]}
      >
        {process.env.NODE_ENV === 'development' && (
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
            <summary>Error Details (Development Only)</summary>
            <div style={{ 
              background: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              marginTop: '10px',
              fontSize: '12px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              <strong>Error:</strong> {error && error.toString()}
              <br />
              <strong>Stack Trace:</strong>
              <pre>{errorInfo.componentStack}</pre>
            </div>
          </details>
        )}
      </Result>
    </div>
  );
};

export default ErrorBoundary;
