import { useEffect, useState } from 'react';
import { Organization } from '../../types/organization';
import { OrganizationService } from '../../services/organizationService/organizationService';
import { useAxiosSecure } from '../useAxiosSecure';

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const data = await OrganizationService.getOrganizations(axiosSecure);
        setOrganizations(data);
      } catch (err) {
        setError('Failed to fetch organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [axiosSecure]);

  return { organizations, loading, error };
};