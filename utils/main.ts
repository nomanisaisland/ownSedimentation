/*
 * @Author: lujiafeng
 * @Date: 2022-01-14 17:16:47
 * @LastEditTime: 2022-03-14 15:49:46
 * @LastEditors: lujiafeng
 * @Description: 
 * @FilePath: \utils\main.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
class Startup {
  public static main(): number {
      var args = process.argv;
      args.splice(0, 2);
      console.log(args);
      return 0;
  }
}

Startup.main();