import { useEffect, useState } from 'react';
import { Organization } from '../../types/organization';
import { OrganizationService } from '../../services/organizationService/organizationService';
import { useAxiosSecure } from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export const useOrganizations = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery<Organization[], Error>({
    queryKey: ['organizations'],
    queryFn: () => OrganizationService.getOrganizations(axiosSecure),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};