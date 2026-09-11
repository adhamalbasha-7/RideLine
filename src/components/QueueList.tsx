interface QueueListProps {
  groupName: string;
  riders: number;
  isNext: boolean;
}
function QueueList({ groupName, riders, isNext }: QueueListProps) {
  return (
    <div className={`queue-item ${isNext ? "next" : ""}`}>
      {" "}
      <div className="queue-info">
        {" "}
        <p className="group-name">{groupName}</p>{" "}
        <p className="riders">Riders: {riders}</p>{" "}
      </div>{" "}
      {isNext && <span className="next-badge">NEXT</span>}{" "}
    </div>
  );
}
export default QueueList;
