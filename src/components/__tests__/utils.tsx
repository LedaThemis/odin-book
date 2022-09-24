import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { render } from '@testing-library/react';

import useCurrentUser from '../../hooks/useCurrentUser';

/**
 * QueryClient used for testing components that use react-query
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

test('should render correctly', () => {
    const Component = () => {
        const query = useCurrentUser();

        return <div>{query.status}</div>;
    };

    render(
        <QueryClientProvider client={queryClient}>
            <Component />
        </QueryClientProvider>,
    );
});
