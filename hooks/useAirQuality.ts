import { formatISODate } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

const useAirQuality = ({selectedParams, startDate, endDate}) => {

    const result = useQuery({
      queryKey: ['airQualityData', selectedParams, startDate, endDate],
      queryFn: async () => {
        const params = new URLSearchParams({
          parameters: selectedParams.join('__'),
          start_date: formatISODate(startDate),
          end_date: formatISODate(endDate),
        });
  
        const response = await fetch(`/api/time-series?${params}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      },
      staleTime: 1000 * 60
    });
  return result
}

export default useAirQuality
