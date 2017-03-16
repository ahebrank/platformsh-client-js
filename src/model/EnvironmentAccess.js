import Ressource from './Ressource';

const paramDefaults = {};

const ROLE_ADMIN = 'admin';
const ROLE_VIEWER = 'viewer';
const ROLE_CONTRIBUTOR = 'contributor';

const roles = [ROLE_ADMIN, ROLE_VIEWER, ROLE_CONTRIBUTOR];

export default class EnvironmentAccess extends Ressource {
  constructor(environmentAccess, url) {
    super(url, paramDefaults, { }, environmentAccess, ['name', 'ssl']);
    this.user = '';
    this.role = '';
    this.project = '';
    this.environment = '';
    this._required = ['user', 'role'];
  }

  static get(params, url) {
    const { id, ...queryParams } = params;

    return super.get(`${url}/:id`, { name }, paramDefaults, queryParams);
  }

  static query(params, url) {
    return super.query(url, {}, paramDefaults, params);
  }

  /**
  * @inheritdoc
  */
  checkProperty(property, value) {
    const errors = {};

    if (property === 'role' && roles.indexOf(value) === -1) {
      errors[property] = `Invalid environment role: '${value}'`;
    }
    return errors;
  }
  /**
  * {@inheritdoc}
  */
  getLink(rel, absolute = true) {
    if (rel === '#edit' && !this.hasLink(rel)) {
      return this.getUri(absolute);
    }
    return super.getLink(rel, absolute);
  }
}