"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Organization,
  setOrganizations,
} from "@/store/slices/organizationSlice";
import OrganizationModal from "@/components/client/organization/OrganizationModal";
import OrganizationCard from "@/components/client/organization/organizationCard";
import mockOrganizations from "@/mock/mock-organizations.json";

export default function OrganizationPage() {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(
    (state) => state.organization.organizations
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

  useEffect(() => {
    if (organizations.length === 0) {
      dispatch(setOrganizations(mockOrganizations));
    }
  }, [dispatch, organizations.length]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organizations</h1>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
            onClick={() => {
              setEditingOrg(null);
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
                setEditingOrg(org);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {modalOpen && (
        <OrganizationModal
          onClose={() => setModalOpen(false)}
          initialData={editingOrg}
        />
      )}
    </div>
  );
}
