import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
import { CrawlerListener } from 'src/crawler/crawler.listener';

@Module({
  providers: [CrawlerService, CrawlerListener],
  controllers: [CrawlerController],
})
export class CrawlerModule {}
