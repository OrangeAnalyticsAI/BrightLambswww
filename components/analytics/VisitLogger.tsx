'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitLogger() {
  const pathname = usePathname();

  useEffect(() => {
    const timerId = setTimeout(() => {
      const logVisit = async () => {
        try {
          console.log('Sending visit log for path:', pathname);
          const response = await fetch('/api/log-visit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: pathname }),
          });

          try {
            let data;
            try {
              data = await response.json();
            } catch (jsonError) {
              // If we can't parse the response as JSON, log the raw response
              const text = await response.text();
              console.error('Error parsing response as JSON:', jsonError, 'Response text:', text);
              return;
            }
            
            if (!response.ok) {
              console.error('Error logging visit:', {
                status: response.status,
                statusText: response.statusText,
                data: data
              });
            } else {
              console.log('Visit logged successfully:', data);
            }
          } catch (error) {
            // Catch any other errors
            console.error('Unexpected error processing response:', error);
          }
        } catch (error) {
          console.error('Failed to log visit:', error);
        }
      };

      logVisit();
    }, 5000); // 5-second delay

    // If the user navigates away before 5 seconds, clear the timer.
    return () => {
      clearTimeout(timerId);
    };
  }, [pathname]);

  return null; // This component does not render anything
}
