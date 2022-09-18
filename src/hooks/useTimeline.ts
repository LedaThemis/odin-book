import { useQuery } from '@tanstack/react-query';

import getTimeline from '../lib/getTimeline';

const useTimeline = () => useQuery(['timeline'], getTimeline);

export default useTimeline;
