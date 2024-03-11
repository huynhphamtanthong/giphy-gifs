import * as _ from 'lodash';

export class CommonUtils {
  static splitListIntoMatrix2d<T>(data: T[] = [], col = 3): T[][] {
    if (_.isEmpty(data)) return [];
    const result: T[][] = [];
    const arrLength = Math.ceil(data.length / col);
    for (let i = 0; i < col; i++) {
      const start = i * arrLength;
      const end = Math.min((i + 1) * arrLength, data.length);
      result.push(data.slice(start, end));
    }

    return result;
  }

  static addKeyValueToObjectList(
    objectList: any[],
    key: string,
    value: any
  ): any[] {
    for (let i = 0; i < objectList.length; i++) {
      objectList[i][key] = value;
    }
    return objectList;
  }
}
