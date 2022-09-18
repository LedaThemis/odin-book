import { useQuery } from '@tanstack/react-query';

import getUserPeople from '../lib/getUserPeople';

const usePeopleYouMightKnow = () => useQuery(['people'], getUserPeople);

export default usePeopleYouMightKnow;