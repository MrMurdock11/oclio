import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import { BooksManagementPattern } from '@oclio/common/enums';
import {
  CreateChapterPayload,
  DeleteChapterPayload,
  UpdateChapterPayload,
} from '@oclio/common/payloads';
import {
  CreateChapterResult,
  DeleteChapterResult,
  UpdateChapterResult,
} from '@oclio/common/results';
import { RpcResult } from '@oclio/common/results/rpc/rpc-result';

import { CreateChapterCommand } from '../application/chapters/commands/create-chapter/create-chapter.command';
import { DeleteChapterCommand } from '../application/chapters/commands/delete-chapter/delete-chapter.command';
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
}
