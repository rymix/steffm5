import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MixcloudPlayer } from './MixcloudPlayer';

describe('MixcloudPlayer', () => {
  it('renders without crashing with empty keys', () => {
    render(<MixcloudPlayer keys={[]} />);
    expect(screen.getByText('No tracks provided')).toBeInTheDocument();
  });

  it('renders with sample keys', () => {
    const keys = ['/test-key'];
    render(<MixcloudPlayer keys={keys} />);
    expect(screen.getByText('Current Track: 1 of 1')).toBeInTheDocument();
    expect(screen.getByText('Key: /test-key')).toBeInTheDocument();
  });
});