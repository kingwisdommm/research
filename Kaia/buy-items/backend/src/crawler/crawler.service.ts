import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { AddItemDto } from 'src/crawler/dto/AddItem.dto';
import { BuyItemsDto } from 'src/crawler/dto/BuyItem.dto';
import * as abi from './abi.json';

@Injectable()
export class CrawlerService implements OnModuleInit {
  private readonly logger = new Logger(CrawlerService.name);
  private contract: ethers.Contract;
  private signer: ethers.Wallet;
  private provider: ethers.JsonRpcProvider;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeContract();
  }

  private async initializeContract() {
    const contractAddress = this.configService.get<string>(
      'kairos.contractAddress',
    );
    const signaturePrivateKey = this.configService.get<string>(
      'kairos.signerPrivateKey',
    );
    const rpcUrl = this.configService.get<string>('kairos.rpcUrl');
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    // Create signer only if a private key is provided
    if (signaturePrivateKey) {
      this.signer = new ethers.Wallet(signaturePrivateKey, this.provider);
    }
    this.contract = new ethers.Contract(
      contractAddress,
      abi,
      this.signer || this.provider, // Use signer if available, otherwise use provider
    );
    if (this.contract) {
      this.logger.log('Contract initialized successfully');
    }
  }

  async getOwner() {
    try {
      const owner = await this.contract.owner();
      this.logger.log(`getOwner called, result: ${owner}`);
      return { myNumber: owner.toString() };
    } catch (error) {
      this.logger.error(`Error calling getMyNumber: ${error}`);
      throw error;
    }
  }

  async getItem(itemId: number) {
    try {
      const [name, price] = await this.contract.getItem(itemId);
      this.logger.log(
        `getItem called for itemId ${itemId}, result: ${name}, ${price}`,
      );
      return { name, price: price.toString() }; // Convert BigNumber if needed
    } catch (error) {
      this.logger.error(`Error calling getItem for itemId ${itemId}: ${error}`);
      throw error;
    }
  }

  async buyItem(itemId: number, buyItemDto: BuyItemsDto) {
    try {
      const [name, price] = await this.contract.getItem(itemId);
      this.logger.log(
        `getItem called for itemId ${itemId}, result: ${name}, ${price}`,
      );
      return { name, price: price.toString() }; // Convert BigNumber if needed
    } catch (error) {
      this.logger.error(`Error calling getItem for itemId ${itemId}: ${error}`);
      throw error;
    }
  }

  // TODO: using private key is owner of the contract
  async addItem(addItemDto: AddItemDto) {
    if (!this.signer) {
      throw new Error('Signer not available to sign transactions.');
    }

    if (addItemDto)
      try {
        const tx = await this.contract.addItem(
          addItemDto.name,
          addItemDto.price,
        );
        this.logger.log(`addItem transaction sent: ${tx.hash}`);
        const receipt = await tx.wait();
        this.logger.log(
          `Transaction confirmed in block ${receipt.blockNumber}`,
        );
        this.logger.log(`Gas used: ${receipt.gasUsed.toString()}`);
        return tx.hash;
      } catch (error) {
        this.logger.error(`Error calling addItem: ${error}`);
        throw error;
      }
  }

  async generateSignature(buyerAddress: string) {
    try {
      const nonce = await this.contract.nonces(buyerAddress);
      const expirationTime = Math.floor(Date.now() / 1000) + 10 * 60; // expire after 10 minutes

      const itemIds = [1];
      const amounts = [1];

      const messageHash = ethers.solidityPackedKeccak256(
        ['address', 'uint256', 'uint256[]', 'uint256[]', 'uint256'],
        [buyerAddress, nonce, itemIds, amounts, expirationTime],
      );

      const signature = await this.signer.signMessage(
        ethers.getBytes(messageHash),
      );

      return {
        signature,
        expirationTime,
      };
    } catch (error) {
      this.logger.error(`Error calling generateSignature: ${error}`);
      throw error;
    }
  }
}
