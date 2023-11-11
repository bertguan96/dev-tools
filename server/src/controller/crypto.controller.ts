import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CryptoService } from '../service/crypto.service';

/**
 * 加密服务
 */
@Controller("/crypto")
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post("/encryption")
  encryption(@Req() req: Request, @Body() body: any): string {
    Logger.log(body);
    return this.cryptoService.encryption();
  }
}
