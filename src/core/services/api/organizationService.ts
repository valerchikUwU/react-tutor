import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
export const OrganizationService = {
  async getOrganizations(): Promise<Organization[]> {
    try {
      const response = await axios.get(`http://localhost:5000/organizations`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  }
};

export type Organization = {
    id: string;
  
    organizationName: string;
  
    parentOrganizationId: string;
  
    colorCodes: Record<string, string>;
  
    organizationColor: string;
  
    createdAt: Date;
  
    updatedAt: Date;
  
}