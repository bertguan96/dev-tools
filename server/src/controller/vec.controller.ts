import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { VecService } from '../service';
import { BagWordsReq, DataFrame } from '../entity';

/**
 * 向量服务
 */
@Controller("/vec")
export class VecController {
  constructor(private readonly vecService: VecService) {}

  /**
   * 词集模式
   * @param req 
   * @param body 
   * @returns 
   */
  @Post("/bagWords")
  bagWords(@Req() req: Request, @Body() body: BagWordsReq): DataFrame {
    return this.vecService.bagWords(body.input);
  }
}
