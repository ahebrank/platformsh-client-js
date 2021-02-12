import Ressource from "./Ressource";
import { getConfig } from "../config";

import OrganizationMember from "./OrganizationMember";

const paramDefaults = {};
const _url = "/organizations";

const creatableField = ["name", "label", "owner"];
const modifiableField = ["name", "label"];

export default class Organization extends Ressource {
  constructor(organization, url) {
    const { api_url } = getConfig();

    super(
      url || `${api_url}${_url}`,
      paramDefaults,
      {},
      organization,
      creatableField,
      modifiableField
    );
    this.id = "";
    this.name = "";
    this.label = "";
    this.owner = "";
  }

  static get(params = {}, customUrl) {
    const { id, ...queryParams } = params;
    const { api_url } = getConfig();

    return super.get(
      customUrl || `${api_url}${_url}/:id`,
      { id },
      paramDefaults,
      queryParams
    );
  }

  static query(params, customUrl) {
    const { api_url } = getConfig();

    return super.query(
      customUrl || `${api_url}${_url}`,
      {},
      paramDefaults,
      params
    );
  }

  getMembers() {
    return OrganizationMember.query({ organizationId: this.id });
  }

  addMember(member) {
    const organizationMember = new OrganizationMember({
      ...member,
      organizationId: this.id
    });

    return organizationMember.save();
  }

  getLink(rel, absolute = true) {
    if (this.hasLink(rel)) {
      return super.getLink(rel, absolute);
    }
    if (rel === "self") {
      const { api_url } = getConfig();

      return `${api_url}${_url}/:id`;
    }
  }
}
