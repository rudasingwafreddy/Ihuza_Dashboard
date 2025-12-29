import React from "react";
import { Button } from "./base/button";
import { Modal } from "./base/modal";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    return (
      <>
        {this.props.children}
        <Modal
          isOpen={this.state.hasError}
          onClose={this.handleReload}
          title="Something went wrong"
          size="2xl"
        >
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground mb-6">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <div className="w-full">
              <Button onClick={this.handleReload} className="w-fit">
                Reload application
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
