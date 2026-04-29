export interface IPermission {
  id: string;
  permissionName: string;
  permissionCode: string;
}

export interface IRole {
  id: string;
  roleName: string;
  permissionCodes: string[];
}
