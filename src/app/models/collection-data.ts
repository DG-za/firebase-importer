export class CollectionData {
  name: string;
  values: any[];

  constructor(name: string, values: any[]) {
    this.name = name;
    this.values = values;
  }

  static fromJSON(jsonObject: any): CollectionData[] {
    if (Object.values(jsonObject).every(value => Array.isArray(value))) {
      return Object.entries(jsonObject).map(([name, value]) => {
        return { name, values: Object.values(value) };
      });
    } else {
      return [{ name: '', values: Array.isArray(jsonObject) ? jsonObject : [jsonObject] }];
    }
  }
}
