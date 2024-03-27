/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call createComment function when crux(submit) button is clicked
 */
import { render, screen, cleanup } from '@testing-library/react';
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
    const bodyThreadInput = screen.getByPlaceholderText('Ceritakan ceritamu...');

    // action
    await userEvent.type(bodyThreadInput, 'ini body thread');

    // assert
    expect(bodyThreadInput).toHaveValue('ini body thread');
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

  it('should handle category typing correctly', async () => {
    // arrange
    const onCreateThreadHandler = jest.fn();
    render(<ThreadForm createThreadHandler={onCreateThreadHandler} />);
    const titleThreadInput = screen.getByPlaceholderText('Judul Thread');
    const bodyThreadInput = screen.getByPlaceholderText('Ceritakan ceritamu...');
    const categoryThreadInput = screen.getByPlaceholderText('Ketik Topic');
    const submitButton = screen.getByText('Posting Thread');

    await userEvent.type(titleThreadInput, 'ini judul thread');
    await userEvent.type(bodyThreadInput, 'ini body thread');
    await userEvent.type(categoryThreadInput, 'ini category thread');

    // action
    await userEvent.click(submitButton);

    // assert
    expect(onCreateThreadHandler).toHaveBeenCalledWith({
      title: 'ini judul thread',
      body: 'ini body thread',
      category: 'ini category thread'
    });
  });
});