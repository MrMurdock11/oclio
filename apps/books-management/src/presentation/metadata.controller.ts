import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import { GetCategoriesAndGenresResult } from '@oclio/clients/books-management/results';
import { BooksManagementPattern } from '@oclio/common/enums';
import { RpcResult } from '@oclio/common/rpc-result';

import { genres } from '../shared/genres';
import { RpcResultInterceptor } from '../shared/interceptors';

@UseInterceptors(RpcResultInterceptor)
@Controller()
export class MetadataController {
  @MessagePattern({ cmd: BooksManagementPattern.GetCategoriesAndGenres })
  getCategoriesAndGenres(): GetCategoriesAndGenresResult {
    try {
      console.log("i'm here");
      return RpcResult.ok(HttpStatus.CREATED, genres);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(error.getStatus(), error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while deleting the chapter');
    }
  }
}
