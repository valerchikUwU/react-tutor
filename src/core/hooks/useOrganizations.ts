import { useEffect, useState } from 'react';
import { Organization, OrganizationService } from '../services/api/organizationService';

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const data = await OrganizationService.getOrganizations();
        setOrganizations(data);
      } catch (err) {
        setError('Failed to fetch organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return { organizations, loading, error };
};