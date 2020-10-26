import Config from '../../types/config';
import Cohorte from '../../types/Cohorte';
export { default as Cohorte } from '../../types/Cohorte';
export default function useCohortes(variables: Record<string, any>, config?: Config): {
    create: (...args: any[]) => void;
    loading: boolean;
    fetch: (options?: import("@apollo/client").QueryLazyOptions<Record<string, any>>) => void;
    result: Cohorte[];
    count: number;
    refetch: (variables?: Partial<Record<string, any>>) => Promise<import("@apollo/client").ApolloQueryResult<any>>;
    rowsPerPageOptions: number[];
    rowsPerPage: number;
    page: number;
    onChangePage: (page: number) => void;
    onChangeRowsPerPage: (rows: number) => void;
};
