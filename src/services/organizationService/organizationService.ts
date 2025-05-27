import { Organization } from '../../types/organization'
import { AxiosInstance } from 'axios';

export const OrganizationService = {
    async getOrganizations(axiosSecure: AxiosInstance): Promise<Organization[]> {
        try {
            const response = await axiosSecure.get('/organizations');
            return response.data
        } catch (err) {
            console.error('Error fetching organizations:', err)
            throw err
        }
    }
}