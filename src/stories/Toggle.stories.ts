import type { Meta, StoryObj } from '@storybook/react';
import Toggle from '../components/toggle/Toggle';
const stories: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
}
 
export default stories;
type Story = StoryObj<typeof Toggle>;

const withContentDark: Story = {
  args: {
    content: 'dark'
  },
};

const withContentLight: Story = {
  args: {
    content: 'light'
  },
};

export {
  withContentDark,
  withContentLight
}