import { expect, describe, it, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../src/App'

describe('Testing App', () => {
  beforeEach(() => {
    render(<App />);
  });
  
  it('should display the correct number of matches after data is fetched', async () => {
    // Wait for the "Loading..." text to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Wait for the matches to be rendered and then check the count
    const matches = await screen.findAllByTestId('match-item'); // Assuming each match has a `data-testid="match-item"`
    expect(matches.length).toBeGreaterThan(1);
  });

  it('should display the correct number of articles after data is fetched', async () => {
    // Wait for the articles to be rendered and then check the count
    await waitFor(async() => {
      const articles = await screen.findAllByTestId('article-item'); // Assuming each article has a `data-testid="article-item"`
      expect(articles.length).toBeGreaterThan(1);
    }, {timeout: 10000});
  });

  it('should display the correct number of favourite articles after data is fetched', async () => {
    await waitFor(() => {
      const element = screen.queryByTestId('no-favart-item');
      expect(element).toBeInTheDocument();
    }, {timeout: 10000});
  });
});