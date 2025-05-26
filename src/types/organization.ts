export type Organization = {
    id: string;
  
    organizationName: string;
  
    parentOrganizationId: string;
  
    colorCodes: Record<string, string>;
  
    organizationColor: string;
  
    createdAt: Date;
  
    updatedAt: Date;
  
}