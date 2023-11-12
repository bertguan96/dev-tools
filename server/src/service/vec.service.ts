import { Injectable, Logger } from '@nestjs/common';
import { cut } from "nodejieba";
import {DataFrame} from '../entity';


@Injectable()
export class VecService {

  bagWords(input: string): DataFrame {
    const docs = input.split("\n"); // 拆分输入字符串
    const words = []
    for (let i = 0; i < docs.length; i++) {
      words.push(...cut(docs[i]));
    }
    const vocab: string[] = Array.from(new Set(words)).sort((a, b) => words.indexOf(a) - words.indexOf(b));
    const m = docs.length;
    const v = vocab.length;
    const onehot: number[][] = [];
    // 实现一个长度为m和v的矩阵
    for (let i = 0; i < m; i++) {
      const row = new Array(v).fill(0)
      const doc =  cut(docs[i]);  // 涉及到中文直接先分词
      for (const word of doc) {
        Logger.log(word)
        if (vocab.includes(word)) {
          row[vocab.indexOf(word)] = 1;
        }
      }
      onehot.push(row);
    }
    return new DataFrame(onehot, vocab);
  }
}
