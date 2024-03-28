import type { Meta, StoryObj } from '@storybook/react';
import ButtonLink from '../components/buttons/ButtonLink';

const stories: Meta<typeof ButtonLink> = {
  title: 'Button Link',
  component: ButtonLink
};

export default stories;
type Story = StoryObj<typeof ButtonLink>;

const withPathLogin: Story = {
  args: {
    action: 'Login'
  }
};
const withPathRegister: Story = {
  args: {
    action: 'Register'
  }
};
const withPathBeranda: Story = {
  args: {
    action: 'Beranda'
  }
};
const withPathBuatThread: Story = {
  args: {
    action: 'buatThread'
  }
};
const withPathLeaderboard: Story = {
  args: {
    action: 'Leaderboard'
  }
};

export {
  withPathRegister,
  withPathBeranda,
  withPathBuatThread,
  withPathLeaderboard,
  withPathLogin
};