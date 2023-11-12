import { Module } from '@nestjs/common';
import { CryptoController } from './controller';
import { CryptoService, VecService } from './service';
import { VecController } from './controller/vec.controller';


@Module({
  imports: [],
  controllers: [CryptoController, VecController],
  providers: [CryptoService, VecService],
})
export class AppModule {}
