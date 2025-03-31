import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {} 