import { ajaxGetJSON } from './ajax-operators';

// Example usage: Fetch data from a public API and log progress events
const progressSubscriber = {
  next: (event: ProgressEvent) => {
    const percentComplete = event.lengthComputable ? (event.loaded / event.total) * 100 : null;
    console.log('Download Progress:', percentComplete ? percentComplete.toFixed(2) + '%' : 'Progress event received');
  },
  error: (err: any) => console.error('Progress Error:', err),
  complete: () => console.log('Progress complete'),
};

const url = 'https://jsonplaceholder.typicode.com/todos/1';

ajaxGetJSON(url, {}, true, progressSubscriber).subscribe({
  next: (data) => console.log('Data received:', data),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Request complete'),
});
