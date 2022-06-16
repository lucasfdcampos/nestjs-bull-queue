import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CustomHttp } from './infra/http/custom.http';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CustomHttp],
  exports: [CustomHttp],
})
export class CommonModule {}
