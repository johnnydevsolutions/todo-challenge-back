import { Controller, Get } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('api/quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getQuote() {
    return this.quoteService.getQuote();
  }
} 