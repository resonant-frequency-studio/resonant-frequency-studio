import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    primary: {
      control: 'boolean',
      description: 'Is this the principal call to action on the page?',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'How large should the button be?',
    },
    label: {
      control: 'text',
      description: 'Button contents',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const CustomBackground: Story = {
  args: {
    backgroundColor: '#00ff00',
    label: 'Custom Button',
  },
};
