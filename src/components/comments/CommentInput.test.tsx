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
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInputComponent', () => {
  afterEach(() => {
    cleanup();
  });

  const authUser = {
    id: 'users-1',
    name: 'jhon doe',
    email: 'jhondoe@mail.co',
    avatar: 'https://ui-avatars.com/api/?name=jhon&background=random'
  };

  it('should handle content typing correctly', async () => {
    // arrange
    render(<CommentInput authUser={authUser} createCommentHandler={() => {}} />);
    const commentInput = screen.getByPlaceholderText('Berikan Crux...');

    // action
    await userEvent.type(commentInput, 'commentTest');

    // assert
    expect(commentInput).toHaveValue('commentTest');
  });

  it('should call createComment function when crux(submit) button is clicked', async () => {
    // arrange
    const onCreateCommentHandler = jest.fn();
    render(<CommentInput authUser={authUser} createCommentHandler={onCreateCommentHandler} />);
    const commentButton = screen.getByText('Crux');
    const commentInput = screen.getByPlaceholderText('Berikan Crux...');
    await userEvent.type(commentInput, 'commentTest');

    // action
    await userEvent.click(commentButton);

    // assert
    expect(onCreateCommentHandler).toHaveBeenCalledWith('commentTest');
  });
});