import { useAppDispatch, useAppSelector } from "@/store/hooks";
import OrganizationCard from "./organizationCard";
import { useState } from "react";
import { Organization } from "@/store/slices/organizationSlice";
import OrganizationModal from "./OrganizationModal";

export default function OrganizationList() {
  const organizations = useAppSelector(
    (state) => state.organization.organizations
  );
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [editOrg, setEditOrg] = useState<Organization | null>(null);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Organizations</h2>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => {
            setEditOrg(null);
            setModalOpen(true);
          }}
        >
          + Добавить организацию
        </button>
      </div>

      <div className="space-y-4">
        {organizations.map((org) => (
          <OrganizationCard
            key={org.id}
            organization={org}
            onEdit={(org) => {
              setEditOrg(org);
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      {modalOpen && (
        <OrganizationModal
          onClose={() => setModalOpen(false)}
          initialData={editOrg}
        />
      )}
    </div>
  );
}
