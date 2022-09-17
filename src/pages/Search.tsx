import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import FetchingOverlay from '../components/HOCs/FetchingOverlay';
import Navbar from '../components/Navbar';
import PeopleSearchResult from '../components/PeopleSearchResult';
import useUsersSearchQuery from '../hooks/useQuerySearch';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('q');
    const resultsQuery = useUsersSearchQuery(queryParam);

    return (
        <StyledWrapper>
            <Navbar />
            <StyledContainer>
                <StyledSectionsContainer>
                    <FetchingOverlay isFetching={resultsQuery.isLoading}>
                        {resultsQuery.isSuccess && (
                            <PeopleSearchResult users={resultsQuery.data} />
                        )}
                    </FetchingOverlay>
                </StyledSectionsContainer>
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

const StyledSectionsContainer = styled.div`
    min-width: 568px;

    @media screen and (max-width: 600px) {
        min-width: fit-content;
    }
`;

export default SearchPage;
