"use client";

import {
  Organization,
  deleteOrganization,
} from "@/store/slices/organizationSlice";
import { useAppDispatch } from "@/store/hooks";

interface Props {
  organization: Organization;
  onEdit: (organization: Organization) => void;
}

export default function OrganizationCard({ organization, onEdit }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="border p-4 rounded flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
      <div>
        <h4 className="font-semibold text-lg">{organization.name}</h4>
        <p className="text-sm text-gray-600">{organization.city}</p>
        <p className="text-sm text-gray-600">{organization.email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(organization)}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => dispatch(deleteOrganization(organization.id))}
          className="text-sm px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
