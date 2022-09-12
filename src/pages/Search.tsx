import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import PeopleSearchResult from '../components/PeopleSearchResult';
import { ErrorType } from '../lib/interfaces/Error';
import { IUser } from '../lib/interfaces/User';
import queryUsers from '../lib/queryUsers';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('q');
    const [results, setResults] = useState<IUser[]>([]);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    useEffect(() => {
        if (!queryParam || queryParam.length < 1) return;

        (async () => {
            const res = await queryUsers({ q: queryParam });

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
                <PeopleSearchResult users={results} errors={errors} />
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
