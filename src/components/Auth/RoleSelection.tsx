import { useDispatch, useSelector } from "react-redux";
import { setRole } from "@/store/slices/uiSlice";
import { RootState } from "@/store";

export default function RoleSelection() {
  const dispatch = useDispatch();
  const selectedRole = useSelector((state: RootState) => state.ui.selectedRole);

  return (
    <>
      <label className="block mb-2 font-medium">Select your role</label>
      <select
        className="w-full p-3 border rounded-xl"
        value={selectedRole}
        onChange={(e) => dispatch(setRole(e.target.value))}
      >
        <option value="">-- Choose your role --</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="administrator">Administrator</option>
        <option value="maintenance">Maintenance Staff</option>
      </select>
    </>
  );
}
