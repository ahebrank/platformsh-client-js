import { getConfig } from "../config";

import type { APIObject } from "./Ressource";
import { Ressource } from "./Ressource";

const url = "/tickets/category";
const paramDefaults = {};

export type TicketCategoryGetParams = Record<string, any>;

export class TicketCategory extends Ressource {
  id: string;
  label: string;

  constructor(ticketCategory: APIObject) {
    const { api_url } = getConfig();

    super(`${api_url}${url}`, paramDefaults, {}, ticketCategory, [], []);

    this.id = ticketCategory.id;
    this.label = ticketCategory.label;
  }

  static async get(queryParams?: TicketCategoryGetParams) {
    const { api_url } = getConfig();

    return super._query<TicketCategory>(
      `${api_url}${url}`,
      {},
      paramDefaults,
      queryParams
    );
  }
}
