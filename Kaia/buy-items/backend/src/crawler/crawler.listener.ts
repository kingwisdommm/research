import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as abi from './abi.json';

@Injectable()
export class CrawlerListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CrawlerListener.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.listenToItemsPurchasedEvent();
  }

  async onModuleDestroy() {
    // Remove event listener when the module is destroyed
    this.logger.log('ItemsPurchased event listener removed.');
  }

  private listenToItemsPurchasedEvent() {
    const rpcUrl = this.configService.get<string>('kairos.socketUrl');
    const provider = new ethers.WebSocketProvider(rpcUrl);
    const contractAddress = this.configService.get<string>(
      'kairos.contractAddress',
    );

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider, // Use signer if available, otherwise use provider
    );

    if (!contract) {
      this.logger.error('Contract not initialized. Cannot listen to events.');
      return;
    }

    contract.on(
      'ItemsPurchased',
      (buyer, itemIds, amounts, totalCost, event) => {
        //   Convert BigNumber to string for logging
        const itemIdsStr = itemIds.map((id) => id.toString());
        const amountsStr = amounts.map((amount) => amount.toString());

        this.logger.log('ItemsPurchased event received:');
        this.logger.log(`  - Buyer: ${buyer}`);
        this.logger.log(`  - Item IDs: ${itemIdsStr.join(', ')}`);
        this.logger.log(`  - Amounts: ${amountsStr.join(', ')}`);
        this.logger.log(`  - Total Cost: ${totalCost.toString()}`);
        this.logger.log(`  - Transaction Hash: ${event.transactionHash}`);
      },
    );

    this.logger.log('Listening to ItemsPurchased event...');
  }
}
