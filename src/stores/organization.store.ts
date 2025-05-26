
import { makeAutoObservable } from "mobx";

class OrganizationStore {

    selectedOrganizationId: string | null = null;
    constructor() {
        makeAutoObservable(this);
    }
    getSelectedOrganization() {
        return this.selectedOrganizationId;
    }

    setSelectedOrganization(id: string) {
        this.selectedOrganizationId = id;
    }
}


export const organizationStore = new OrganizationStore();