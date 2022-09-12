import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import PeopleSearchResult from '../components/PeopleSearchResult';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import queryUsers from '../lib/queryUsers';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('q');
    const [isFetching, setIsFetching] = useState(true);
    const [results, setResults] = useState<IUser[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        if (!queryParam || queryParam.length < 1) return;

        (async () => {
            setIsFetching(true);
            const res = await queryUsers({ q: queryParam });
            setIsFetching(false);

            switch (res.state) {
                case 'success':
                    setErrors([]);
                    setResults(res.users);
                    break;

                case 'failed':
                    setResults([]);
                    setErrors(res.errors);
                    break;
            }
        })();
    }, [queryParam]);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <FetchingOverlay isFetching={isFetching}>
                    <PeopleSearchResult users={results} errors={errors} />
                </FetchingOverlay>
            </StyledContainer>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    min-height: 100vh;

    background-color: var(--background-color);
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;

    box-sizing: border-box;
    padding: 16px 0;
`;

export default SearchPage;
