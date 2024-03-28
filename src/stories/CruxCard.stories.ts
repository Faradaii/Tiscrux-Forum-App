import type { Meta, StoryObj } from '@storybook/react';
import CruxCard from '../components/card/CruxCard';

const stories: Meta<typeof CruxCard> = {
  title: 'Crux Card',
  component: CruxCard
};

export default stories;
type Story = StoryObj<typeof CruxCard>;

const withTypeAuthTips: Story = {
  args: {
    typeCard: 'authTips'
  }
};

const withTypeLeaderboardTips: Story = {
  args: {
    typeCard: 'leaderboardTips'
  }
};

export {
  withTypeAuthTips,
  withTypeLeaderboardTips
};