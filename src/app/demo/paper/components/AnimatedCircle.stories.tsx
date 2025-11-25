import type { Meta, StoryObj } from '@storybook/react';
import AnimatedCircle from './AnimatedCircle';

const meta: Meta<typeof AnimatedCircle> = {
  title: 'Components/AnimatedCircle',
  component: AnimatedCircle,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedCircle>;

// Default scroll-based animation
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9]">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-[#484D2E]">Scroll Down ↓</h1>
        </div>
        <Story />
        <div className="h-screen" />
      </div>
    ),
  ],
};

// InView mode
export const InViewMode: Story = {
  args: {
    mode: 'inView',
    initialSize: '40%',
    finalSize: '70%',
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] min-h-[200vh]">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-[#484D2E]">Scroll Down ↓</h1>
        </div>
        <div className="h-screen flex items-center justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
};

// With content - Profile Card
export const ProfileCard: Story = {
  args: {
    mode: 'inView',
    fixedSize: '300px',
    color: '#484D2E',
    strokeWidth: 0.5,
  },
  render: (args) => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
      <AnimatedCircle {...args}>
        <div className="flex flex-col items-center justify-center gap-2 p-8">
          <div className="w-20 h-20 rounded-full bg-[#6B7456] flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <h3 className="text-[#484D2E] font-bold text-xl">John Doe</h3>
          <p className="text-[#6B7456] text-sm">Product Designer</p>
        </div>
      </AnimatedCircle>
    </div>
  ),
};

// Different sizes
export const SmallCircle: Story = {
  args: {
    mode: 'inView',
    fixedSize: '30%',
    wobbleIntensity: 1,
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

// Style variants
export const DifferentColor: Story = {
  args: {
    mode: 'inView',
    color: '#FF6B6B',
    strokeWidth: 2,
    fixedSize: '50%',
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const NoWobble: Story = {
  args: {
    mode: 'inView',
    wobbleIntensity: 0,
    fixedSize: '50%',
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

// Nested circles
export const NestedCircles: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center relative">
      <div className="relative w-full h-full">
        <AnimatedCircle
          mode="inView"
          fixedSize="80%"
          color="#484D2E"
          strokeWidth={1}
        />
        <div className="absolute inset-0">
          <AnimatedCircle
            mode="inView"
            fixedSize="60%"
            color="#6B7456"
            strokeWidth={1}
            delay={500}
          />
        </div>
        <div className="absolute inset-0">
          <AnimatedCircle
            mode="inView"
            fixedSize="40%"
            color="#8B9A6E"
            strokeWidth={1}
            delay={1000}
          />
        </div>
      </div>
    </div>
  ),
};

// Sequential circles
export const SequentialCircles: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen grid grid-cols-3 gap-8 p-8">
      <AnimatedCircle mode="sequence" fixedSize="100%" delay={0} />
      <AnimatedCircle mode="sequence" fixedSize="100%" delay={1500} />
      <AnimatedCircle mode="sequence" fixedSize="100%" delay={3000} />
    </div>
  ),
};
