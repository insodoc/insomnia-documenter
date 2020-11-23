import buildRequest from './buildRequest';
import pick from 'lodash.pick';

class CuteConfig {
  constructor(json) {
    this.json = json;
    this.id = null;

    this.cute = {
      workspace: {
        name: null,
        description: null
      },
      cookiejars: [],
      environments: [],
      groups: [],
      requests: []
    };
  }

  metaSort(a, b) {
    return a.metaSortKey - b.metaSortKey;
  }

  mapCookiejar(cookiejar) {
    return pick(cookiejar, 'name', 'cookies');
  }

  filterCookiejars() {
    return this.json.resources
      .filter(r => r._type === 'cookie_jar')
      .map(this.mapCookiejar);
  }

  mapEnvironment(environment) {
    return pick(environment, 'color', 'data', 'name');
  }

  filterEnvironments() {
    return this.json.resources
      .filter(r => r._type === 'environment' && !r.isPrivate)
      .sort(this.metaSort)
      .map(this.mapEnvironment);
  }

  filterRequests(groupId = null) {
    const parentId = groupId || this.id;
    return this.json.resources
      .filter(r => r._type === 'request' && r.parentId === parentId && !r.isPrivate)
      .sort(this.metaSort)
      .map(buildRequest);
  }

  deepMapGroups(predicate) {
    const group = {
      name: predicate.name,
      description: predicate.description,
      _type: predicate._type
    };

    group.children = this.json.resources
      .filter(r => r._type === 'request_group' && r.parentId === predicate._id)
      .sort(this.metaSort)
      .map(this.deepMapGroups.bind(this));

    group.requests = this.filterRequests(predicate._id);

    return group;
  }

  filterRootGroups() {
    const filteredGroups = this.json.resources.filter(r => r._type === 'request_group' && r.parentId === this.id);
    if (!filteredGroups) {
      return [];
    }

    return filteredGroups
      .sort(this.metaSort)
      .map(this.deepMapGroups.bind(this));
  }

  generate() {
    const workspace = this.json.resources.find(r => r._type === 'workspace');
    this.id = workspace._id;
    this.cute.workspace.name = workspace.name;
    this.cute.workspace.description = workspace.description;

    this.cute.cookiejars = this.filterCookiejars();
    this.cute.environments = this.filterEnvironments();

    if (this.cute.environments.length > 1) {
      this.cute.environments = this.cute.environments.slice(1);
    }

    this.cute.groups = this.filterRootGroups();
    this.cute.requests = this.filterRequests();

    return this.cute;
  }
}

export default CuteConfig;
