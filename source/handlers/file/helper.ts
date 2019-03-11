/*
 * Copyright (C) 2018-2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Fs from 'fs';
import * as Util from 'util';

import * as Class from '@singleware/class';

/**
 * File helper class.
 */
@Class.Describe()
export class Helper extends Class.Null {
  /**
   * Read all contents of the specified file.
   * @param path File path.
   * @returns Returns the file content.
   */
  @Class.Public()
  public static async readFile(path: string): Promise<Buffer> {
    return await Util.promisify(Fs.readFile)(path);
  }

  /**
   * Test whether the specified file exists or not.
   * @param path File path.
   * @returns Returns the promise to get true when the file exists or false otherwise.
   */
  @Class.Public()
  public static async fileExists(path: string): Promise<boolean> {
    return (await Util.promisify(Fs.exists)(path)) && (await Util.promisify(Fs.lstat)(path)).isFile();
  }
}
