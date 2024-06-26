import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import {
  CreateChapterPayload,
  DeleteChapterPayload,
  RearrangeChapterPayload,
  UpdateChapterPayload,
} from '@oclio/clients/books-management/payloads';
import {
  CreateChapterResult,
  DeleteChapterResult,
  RearrangeChapterResult,
  UpdateChapterResult,
} from '@oclio/clients/books-management/results';
import { BooksManagementPattern } from '@oclio/common/enums';
import { RpcResult } from '@oclio/common/rpc-result';

import { CreateChapterCommand } from '../application/chapters/commands/create-chapter/create-chapter.command';
import { DeleteChapterCommand } from '../application/chapters/commands/delete-chapter/delete-chapter.command';
import { RearrangeChapterCommand } from '../application/chapters/commands/rearrange-chapter/rearrange-chapter.command';
import { UpdateChapterCommand } from '../application/chapters/commands/update-chapter/update-chapter.command';
import { RpcResultInterceptor } from '../shared/interceptors';

@UseInterceptors(RpcResultInterceptor)
@Controller()
export class ChaptersController {
  constructor(private readonly _commandBus: CommandBus) {}

  @MessagePattern({ cmd: BooksManagementPattern.CreateChapter })
  async create(payload: CreateChapterPayload): Promise<CreateChapterResult> {
    const { bookId, userId, title } = payload;

    try {
      await this._commandBus.execute<CreateChapterCommand>(
        new CreateChapterCommand(title, bookId, BigInt(userId)),
      );

      return RpcResult.ok(HttpStatus.CREATED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while creating the chapter');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.UpdateChapter })
  async update(payload: UpdateChapterPayload): Promise<UpdateChapterResult> {
    const { bookId, userId, chapterId, title, text } = payload;

    try {
      await this._commandBus.execute<UpdateChapterCommand>(
        new UpdateChapterCommand(
          bookId,
          chapterId,
          BigInt(userId),
          title,
          text,
        ),
      );

      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while updating the chapter');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.DeleteChapter })
  async delete(payload: DeleteChapterPayload): Promise<DeleteChapterResult> {
    const { bookId, userId, chapterId } = payload;

    try {
      await this._commandBus.execute<DeleteChapterCommand>(
        new DeleteChapterCommand(bookId, chapterId, BigInt(userId)),
      );

      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while deleting the chapter');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.RearrangeChapter })
  async rearrange(
    payload: RearrangeChapterPayload,
  ): Promise<RearrangeChapterResult> {
    const { bookId, userId, from, to } = payload;

    try {
      await this._commandBus.execute(
        new RearrangeChapterCommand(bookId, BigInt(userId), from, to),
      );

      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while rearranging the chapter');
    }
  }
}
