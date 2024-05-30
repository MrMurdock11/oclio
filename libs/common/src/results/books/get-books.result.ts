import { BookDto } from '@oclio/common/dto';

import { RpcResult } from '../rpc/rpc-result';

export type GetBooksResult = RpcResult<BookDto[]>;
