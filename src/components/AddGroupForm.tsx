import type { FormEvent } from "react";
interface AddGroupFormProps {
  groupName: string;
  setGroupName: (name: string) => void;
  riders: string;
  setRiders: (riders: string) => void;
  handleAddGroup: (event: FormEvent<HTMLFormElement>) => void;
}
function AddGroupForm({
  groupName,
  setGroupName,
  riders,
  setRiders,
  handleAddGroup,
}: AddGroupFormProps) {
  return (
    <section className="add-group">
      {" "}
      <h2>Add New Group</h2>{" "}
      <form onSubmit={handleAddGroup}>
        {" "}
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Number of riders"
          value={riders}
          onChange={(e) => setRiders(e.target.value)}
        />{" "}
        <button type="submit">Add Group</button>{" "}
      </form>{" "}
    </section>
  );
}
export default AddGroupForm;
