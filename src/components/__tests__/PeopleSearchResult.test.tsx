import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { IUser } from '../../lib/interfaces/User';
import { genericUser } from '../../mocks/handlers';
import PeopleSearchResult from '../PeopleSearchResult';

test('should show no people text if users is empty', () => {
    const users: IUser[] = [];

    render(<PeopleSearchResult users={users} />);

    expect(screen.getByText('No people found'));
});

test('should show users if users is not empty', () => {
    const users = [genericUser];

    render(
        <BrowserRouter>
            <PeopleSearchResult users={users} />
        </BrowserRouter>,
    );

    const img: HTMLImageElement = screen.getByRole('img');

    expect(screen.getByText(genericUser.displayName));
    expect(img.src).toContain(genericUser.photoURL);
});
