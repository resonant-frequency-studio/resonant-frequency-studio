import type { Meta, StoryObj } from '@storybook/react';
import AnimatedBox from './AnimatedBox';
import AnimatedCircle from './AnimatedCircle';

const meta: Meta = {
  title: 'Components/HandDrawnUI',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Profile card with circle avatar
export const ProfileCard: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center p-8">
      <AnimatedBox
        mode="inView"
        fixedSize="450px"
        color="#484D2E"
        strokeWidth={0.5}
        wobbleIntensity={0.6}
      >
        <div className="flex flex-col items-center gap-8 p-12">
          {/* Circle with avatar - needs fixed height */}
          <div className="relative w-[140px] h-[140px] flex-shrink-0">
            <AnimatedCircle
              mode="inView"
              fixedSize="100%"
              color="#484D2E"
              strokeWidth={0.3}
              delay={500}
              wobbleIntensity={0.4}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-linear-to-br from-[#6B7456] to-[#8B9A6E] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                JD
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <h3 className="text-[#484D2E] font-bold text-3xl tracking-tight">
              John Doe
            </h3>
            <p className="text-[#6B7456] text-base font-medium">
              Senior Product Designer
            </p>
            <div className="pt-2 border-t border-[#484D2E]/10">
              <p className="text-[#484D2E]/60 text-sm leading-relaxed max-w-[300px]">
                Crafting beautiful interfaces with attention to detail and
                user-centered design
              </p>
            </div>
          </div>
        </div>
      </AnimatedBox>
    </div>
  ),
};

// Product showcase
export const ProductShowcase: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] h-screen flex items-center justify-center gap-8 p-8">
      <AnimatedBox
        mode="inView"
        fixedSize="300px"
        color="#484D2E"
        strokeWidth={0.5}
        delay={0}
      >
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="w-32 h-32 bg-linear-to-br from-[#8B9A6E] to-[#6B7456] rounded-lg" />
          <div className="text-center">
            <h4 className="text-[#484D2E] font-bold text-lg">Product One</h4>
            <p className="text-[#6B7456] text-sm">$49.99</p>
          </div>
        </div>
      </AnimatedBox>

      <AnimatedCircle
        mode="inView"
        fixedSize="300px"
        color="#6B7456"
        strokeWidth={0.5}
        delay={500}
      >
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="w-32 h-32 bg-linear-to-br from-[#484D2E] to-[#6B7456] rounded-full" />
          <div className="text-center">
            <h4 className="text-[#484D2E] font-bold text-lg">Product Two</h4>
            <p className="text-[#6B7456] text-sm">$59.99</p>
          </div>
        </div>
      </AnimatedCircle>

      <AnimatedBox
        mode="inView"
        fixedSize="300px"
        color="#8B9A6E"
        strokeWidth={0.5}
        delay={1000}
      >
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="w-32 h-32 bg-linear-to-br from-[#6B7456] to-[#8B9A6E] rounded-lg" />
          <div className="text-center">
            <h4 className="text-[#484D2E] font-bold text-lg">Product Three</h4>
            <p className="text-[#6B7456] text-sm">$39.99</p>
          </div>
        </div>
      </AnimatedBox>
    </div>
  ),
};

// Feature cards
export const FeatureCards: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-8 max-w-6xl">
        {[
          { title: 'Fast', icon: '⚡', desc: 'Lightning quick performance' },
          { title: 'Secure', icon: '🔒', desc: 'Bank-level encryption' },
          { title: 'Easy', icon: '✨', desc: 'Intuitive user interface' },
        ].map((feature, i) => (
          <AnimatedCircle
            key={feature.title}
            mode="inView"
            fixedSize="250px"
            color="#484D2E"
            strokeWidth={0.5}
            delay={i * 300}
            wobbleIntensity={0.8}
          >
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="text-5xl">{feature.icon}</div>
              <h4 className="text-[#484D2E] font-bold text-xl">
                {feature.title}
              </h4>
              <p className="text-[#6B7456] text-sm">{feature.desc}</p>
            </div>
          </AnimatedCircle>
        ))}
      </div>
    </div>
  ),
};

// Mixed shapes gallery
export const MixedShapesGallery: Story = {
  render: () => (
    <div className="bg-[#E6E4D9] min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#484D2E] mb-12 text-center">
          Hand-Drawn UI Gallery
        </h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="h-64">
            <AnimatedBox
              mode="inView"
              fixedSize="100%"
              strokeWidth={0.5}
              delay={0}
            >
              <div className="p-4 text-center">
                <p className="text-[#484D2E] font-medium">Box 1</p>
              </div>
            </AnimatedBox>
          </div>

          <div className="h-64">
            <AnimatedCircle
              mode="inView"
              fixedSize="100%"
              strokeWidth={0.5}
              delay={200}
            >
              <div className="p-4 text-center">
                <p className="text-[#484D2E] font-medium">Circle 1</p>
              </div>
            </AnimatedCircle>
          </div>

          <div className="h-64">
            <AnimatedBox
              mode="inView"
              fixedSize="100%"
              color="#6B7456"
              strokeWidth={0.5}
              delay={400}
            >
              <div className="p-4 text-center">
                <p className="text-[#484D2E] font-medium">Box 2</p>
              </div>
            </AnimatedBox>
          </div>

          <div className="h-64">
            <AnimatedCircle
              mode="inView"
              fixedSize="100%"
              color="#8B9A6E"
              strokeWidth={0.5}
              delay={600}
            >
              <div className="p-4 text-center">
                <p className="text-[#484D2E] font-medium">Circle 2</p>
              </div>
            </AnimatedCircle>
          </div>
        </div>
      </div>
    </div>
  ),
};
