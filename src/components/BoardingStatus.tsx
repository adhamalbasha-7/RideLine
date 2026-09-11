import type QueueEntry  from "../types/QueueEntry";
interface BoardingStatusProps {
  lastBoarded: QueueEntry | null;
}
function BoardingStatus({ lastBoarded }: BoardingStatusProps) {
  if (lastBoarded === null) {
    return null;
  }
  return (
    <section className="boarding-status">
      {" "}
      <h2>Last Boarded Group</h2> <p>{lastBoarded.groupName}</p>{" "}
      <p>Riders: {lastBoarded.riders}</p>{" "}
    </section>
  );
}
export default BoardingStatus;
