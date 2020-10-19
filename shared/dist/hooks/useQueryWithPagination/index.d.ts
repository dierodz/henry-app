import { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client';
import Config from '../../types/config';
import UseQueryWithPagination from '../../types/useQueryWithPagination';
export default function useQueryWithPagination<T = any>(QUERY_DEFINITION: DocumentNode | TypedDocumentNode<any, Record<string, any>>, variables: OperationVariables, config: Config): UseQueryWithPagination<T>;
