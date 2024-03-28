/**
 * skenario testing
 *
 * - ThreadForm component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 *   - should call createThreadHandler when submit button is clicked
 */
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import ThreadForm from './ThreadForm';

expect.extend(matchers);

describe('ThreadFormComponent', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    render(<ThreadForm createThreadHandler={() => {}} />);
    const titleThreadInput = screen.getByPlaceholderText('Judul Thread');

    // action
    await userEvent.type(titleThreadInput, 'ini judul thread');

    // assert
    expect(titleThreadInput).toHaveValue('ini judul thread');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(<ThreadForm createThreadHandler={() => {}} />);
    let body;
    await waitFor(() => {
      body = screen.getByPlaceholderText('body');
    });

    // action
    fireEvent.change(body, {
      target: { textContent: 'ini body thread' }
    });

    // assert
    expect(body.textContent).toBe('ini body thread');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(<ThreadForm createThreadHandler={() => {}} />);
    const categoryThreadInput = screen.getByPlaceholderText('Ketik Topic');

    // action
    await userEvent.type(categoryThreadInput, 'ini category thread');

    // assert
    expect(categoryThreadInput).toHaveValue('ini category thread');
  });

  it('should call createThreadHandler when submit button is clicked', async () => {
    // arrange
    const onCreateThreadHandler = jest.fn();
    render(<ThreadForm createThreadHandler={onCreateThreadHandler} />);
    const titleThreadInput = screen.getByPlaceholderText('Judul Thread');
    let body;
    await waitFor(() => {
      body = screen.getByPlaceholderText('body');
    });
    const categoryThreadInput = screen.getByPlaceholderText('Ketik Topic');
    const submitButton = screen.getByText('Posting Thread');

    // action
    await userEvent.type(titleThreadInput, 'ini judul thread');
    fireEvent.change(body, {
      target: { innerHTML: 'ini body thread' }
    });
    // await userEvent.type(bodyThreadInput, 'ini body thread');
    await userEvent.type(categoryThreadInput, 'ini category thread');
    await waitFor(() => {
      fireEvent.submit(submitButton);
    });

    // assert
    expect(onCreateThreadHandler).toHaveBeenCalledWith({
      title: 'ini judul thread',
      body: '<p>ini body thread</p>',
      category: 'ini category thread'
    });
  });
});

// error handling rendering errors for the tiptap editor component
function getBoundingClientRect (): DOMRect {
  const rec = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };
  return { ...rec, toJSON: () => rec };
}

class FakeDOMRectList extends Array<DOMRect> implements DOMRectList {
  item (index: number): DOMRect | null {
    return this[index];
  }
}

document.elementFromPoint = (): null => null;
HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = getBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();