import { Organization } from '../../types/organization'
import { AxiosInstance } from 'axios';

export const OrganizationService = {
    async getOrganizations(axiosSecure: AxiosInstance): Promise<Organization[]> {
        try {
            const response = await axiosSecure.get('/organizations');
            return response.data
        } catch (error) {
            console.error('Error fetching organizations:', error)
            throw error
        }
    }
}