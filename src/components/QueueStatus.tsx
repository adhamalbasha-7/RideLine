interface QueueStatusProps {
  isLoading: boolean;
  hasError: boolean;
  loadQueue: () => void;
}
function QueueStatus({ isLoading, hasError, loadQueue }: QueueStatusProps) {
  if (isLoading) {
    return (
      <div className="queue-status">
        {" "}
        <p className="loading">Loading queue...</p>{" "}
      </div>
    );
  }
  if (hasError) {
    return (
      <div className="queue-status">
        {" "}
        <div className="error">
          {" "}
          <p>Failed to load the queue.</p>{" "}
          <button type="button" className="retry-button" onClick={loadQueue}>
            {" "}
            Retry{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
  return null;
}
export default QueueStatus;
