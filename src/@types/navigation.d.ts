interface IDetailsParams {
  name: string;
  completed: boolean;
  createdAt: Date;
}
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      App: undefined;
      Create: undefined;
      Details: IDetailsParams;
    }
  }
}
