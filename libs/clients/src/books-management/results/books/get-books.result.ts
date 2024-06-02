import { BookDto } from '@oclio/common/dto';
import { RpcResult } from '@oclio/common/rpc-result';

export type GetBooksResult = RpcResult<BookDto[]>;
