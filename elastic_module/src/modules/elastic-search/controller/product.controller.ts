import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductElasticService } from '@src/elastic-search/service/product-elastic.service';
import { CreateProductDto } from '@src/elastic-search/dto/product/create.dto';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productElasticService: ProductElasticService) {}

  @Post()
  @ApiOperation({ description: 'indexing product before success PSQL create' })
  indexProductData(@Body() dto: CreateProductDto): Promise<WriteResponseBase> {
    return this.productElasticService.indexProductData(dto);
  }
}
