import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CrawlerService } from 'src/crawler/crawler.service';
import { AddItemDto } from 'src/crawler/dto/AddItem.dto';
import { BuyItemsDto } from 'src/crawler/dto/BuyItem.dto';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('owner')
  getOwner() {
    return this.crawlerService.getOwner();
  }

  @Get('items/:id')
  getItem(@Param('id') itemId: number) {
    return this.crawlerService.getItem(itemId);
  }

  @Post('items/:id')
  buyItem(@Param('id') itemId: number, @Body() buyItemDto: BuyItemsDto) {
    return this.crawlerService.buyItem(itemId, buyItemDto);
  }

  @Post('items/add')
  addItem(@Body() addItemDto: AddItemDto) {
    return this.crawlerService.addItem(addItemDto);
  }

  @Get('signature/:address')
  generateSignature(@Param('address') address: string) {
    return this.crawlerService.generateSignature(address);
  }
}
