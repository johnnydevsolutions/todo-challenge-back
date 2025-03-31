import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface Quote {
  q: string;  // quote text
  a: string;  // author
  h: string;  // HTML format (not used)
}

@Injectable()
export class QuoteService {
  private readonly apiUrl = 'https://zenquotes.io/api/random';
  private cachedQuote: Quote | null = null;
  private lastFetchTime: number = 0;
  private readonly cacheTimeout = 1800000; // 30 minutes in milliseconds

  constructor(private readonly httpService: HttpService) {}

  getQuote(): Observable<{ quote: string; author: string }> {
    const now = Date.now();
    
    // Return cached quote if it exists and is not expired
    if (this.cachedQuote && (now - this.lastFetchTime) < this.cacheTimeout) {
      return of({
        quote: this.cachedQuote.q,
        author: this.cachedQuote.a
      });
    }

    // Fetch new quote from API
    return this.httpService.get<Quote[]>(this.apiUrl).pipe(
      map(response => {
        const quote = response.data[0];
        
        // Update cache
        this.cachedQuote = quote;
        this.lastFetchTime = now;
        
        return {
          quote: quote.q,
          author: quote.a
        };
      }),
      catchError(() => {
        // Return a default quote if API call fails
        return of({
          quote: "Acredite em você mesmo e todo o resto se encaixará.",
          author: "Autor Desconhecido"
        });
      })
    );
  }
} 