import * as testData from "../test-data/data-driven.json";

export class DataReader {
  static getBlueProducts(): string[] {
    return testData.map((item: any) => item.productName);
  }
}