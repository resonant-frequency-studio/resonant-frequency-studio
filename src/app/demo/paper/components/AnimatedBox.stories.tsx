import type { Meta, StoryObj } from '@storybook/react';
import AnimatedBox from './AnimatedBox';

const meta: Meta<typeof AnimatedBox> = {
  title: 'Components/AnimatedBox',
  component: AnimatedBox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedBox>;

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

// InView mode - triggers when scrolled into view
export const InViewMode: Story = {
  args: {
    mode: 'inView',
    initialSize: '30%',
    finalSize: '60%',
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

// Sequence mode - draws on load with delay
export const SequenceMode: Story = {
  args: {
    mode: 'sequence',
    delay: 500,
    drawDuration: 2000,
    scaleDuration: 1000,
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

// Different sizes
export const SmallBox: Story = {
  args: {
    mode: 'inView',
    initialSize: '20%',
    finalSize: '40%',
    triggerOnce: false,
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const FixedSize: Story = {
  args: {
    mode: 'inView',
    fixedSize: '50%',
    enableScale: false,
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
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const HighWobble: Story = {
  args: {
    mode: 'inView',
    wobbleIntensity: 2,
    color: '#4ECDC4',
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
  },
  decorators: [
    (Story) => (
      <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

// Nested boxes
export const NestedBoxes: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center relative">
      <div className="relative w-full h-full">
        <AnimatedBox
          mode="inView"
          fixedSize="80%"
          color="#484D2E"
          strokeWidth={1}
        />
        <div className="absolute inset-0">
          <AnimatedBox
            mode="inView"
            fixedSize="60%"
            color="#6B7456"
            strokeWidth={1}
            delay={500}
          />
        </div>
        <div className="absolute inset-0">
          <AnimatedBox
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

// Sequential animation
export const SequentialBoxes: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen grid grid-cols-3 gap-8 p-8">
      <AnimatedBox mode="sequence" fixedSize="100%" delay={0} />
      <AnimatedBox mode="sequence" fixedSize="100%" delay={1500} />
      <AnimatedBox mode="sequence" fixedSize="100%" delay={3000} />
    </div>
  ),
};

// Draw only
export const DrawOnly: Story = {
  args: {
    mode: 'inView',
    enableScale: false,
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

// Scale only (no draw animation)
export const ScaleOnly: Story = {
  args: {
    mode: 'scroll',
    enableDraw: false,
    initialSize: '30%',
    finalSize: '90%',
  },
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

// With text content
export const WithTextContent: Story = {
  args: {
    mode: 'inView',
    fixedSize: '400px',
    strokeWidth: 0.5,
  },
  render: (args) => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
      <AnimatedBox {...args}>
        <div className="p-8 text-center max-w-xs">
          <h3 className="text-[#484D2E] font-bold text-2xl mb-4">
            Hello World
          </h3>
          <p className="text-[#6B7456] text-sm">
            This is a hand-drawn box with content inside. You can put anything
            here!
          </p>
        </div>
      </AnimatedBox>
    </div>
  ),
};

// Product card
export const ProductCard: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center">
      <AnimatedBox
        mode="inView"
        fixedSize="350px"
        color="#484D2E"
        strokeWidth={0.5}
        wobbleIntensity={0.6}
      >
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="w-40 h-40 bg-linear-to-br from-[#6B7456] to-[#8B9A6E] rounded-lg" />
          <div className="text-center">
            <h4 className="text-[#484D2E] font-bold text-xl mb-2">
              Premium Product
            </h4>
            <p className="text-[#6B7456] text-sm mb-3">Handcrafted with care</p>
            <p className="text-[#484D2E] font-bold text-2xl">$99.99</p>
          </div>
        </div>
      </AnimatedBox>
    </div>
  ),
};
