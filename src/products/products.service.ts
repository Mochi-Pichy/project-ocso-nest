import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Sabritas normal',
      price: 29,
      countSell: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Coca cola 600ml',
      price: 40,
      countSell: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Agua Ciel 1L',
      price: 15,
      countSell: 2,
      provider: uuid(),
    },
  ];

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    const savedproduct = this.productRepository.save(product)
    return savedproduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
   const product = this.productRepository.findOneBy({
     productId: id 
    })
   if (!product) throw new NotFoundException(); 
   return product;
  }

  findByProvider(id: string) {
    const productsFound = this.products.filter((product) => product.provider === id);
    if (productsFound.length === 0) throw new NotFoundException();
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product= this.findOne(id);
    this.products = this.products.map((product) => {
      if (product.productId === id) return { 
        ...product, 
        ...updateProductDto 
      }
      return product;
    })  
     return { 
      ...product, 
      ...updateProductDto 
    }
  }

  async remove(id: string) {
    const { productId } = await this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== productId);
    return this.products;
  }
}

