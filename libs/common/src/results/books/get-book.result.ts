import { BookDto } from '../../dto';
import { RpcResult } from '../rpc/rpc-result';

export type GetBookResult = RpcResult<BookDto>;
