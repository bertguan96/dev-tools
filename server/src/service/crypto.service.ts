import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  encryption(): string {
    return 'Hello World11';
  }
}
