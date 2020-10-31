export class CollectionData {
  name: string;
  values: any[];

  constructor(name: string, values: any[]) {
    this.name = name;
    this.values = values;
  }

  static fromJSON(jsonObject: any): CollectionData[] {
    return Object.entries(jsonObject).map(([name, value]) => {
      return {name, values: Object.values(value)};
    });
  }
}
