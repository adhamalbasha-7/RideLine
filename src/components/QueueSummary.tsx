interface QueueSummaryProps {
  groupsWaiting: number;
  totalRiders: number;
}
function QueueSummary({ groupsWaiting, totalRiders }: QueueSummaryProps) {
  return (
    <section className="queue-summary">
      {" "}
      <div className="summary-card">
        {" "}
        <p>Groups Waiting</p> <p>{groupsWaiting}</p>{" "}
      </div>{" "}
      <div className="summary-card">
        {" "}
        <p>Total Riders</p> <p>{totalRiders}</p>{" "}
      </div>{" "}
    </section>
  );
}
export default QueueSummary;
