import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: (error?: any) => void) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || ''; // 헤더에서 가져옴

    // 응답이 끝났을 때
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || 0;
      this.logger.log(
        `method: ${method}
         originalUrl: ${originalUrl} 
         statusCode: ${statusCode} 
         contentLength: ${contentLength}
         userAgent: ${userAgent}
         ip: ${ip}`,
      );
    });
    next();
  }
}
