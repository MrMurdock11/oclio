import { Genres } from 'apps/books-management/src/shared/genres';

import { RpcResult } from '@oclio/common/rpc-result';

export type GetCategoriesAndGenresResult = RpcResult<Genres>;
