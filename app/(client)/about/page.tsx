import Container from '@/components/Container'
import { Title } from '@/components/ui/text'
import React from 'react'

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <Container className="lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
            <Title className="mb-4">
                ABOUT US
            </Title>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12 mb-12">
            <div className="space-y-6 text-gray-950" style={{ textAlign: 'justify' }}>
                <p className="font-medium tracking-tight leading-relaxed text-lg">
                    Taylor Finds offers a carefully curated collection of merchandise that goes beyond typical fan gear to become meaningful keepsakes for every Swiftie. Our product range includes cozy hoodies, trendy tees, and embroidered sweatshirts inspired by Taylor Swift&apos;s distinct eras, each designed to capture the mood and aesthetic fans love.
                </p>
                
                <p className="font-medium tracking-tight leading-relaxed text-lg">
                    We also feature lyric-based accessories like jewelries, bags, phone cases, enamel pins, and ornaments that highlight iconic lines from Taylor&apos;s songs, turning words into emotional touchstones. For fans who love to express their creativity, our stationery selection—journals and notepads—adds a lyrical flair to everyday life.
                </p>
                
                <p className="font-medium tracking-tight leading-relaxed text-lg">
                    We frequently launch limited edition drops tied to album anniversaries or fan milestones, offering exclusive designs and collectible packaging that make each item feel special. A signature feature of Taylor Finds is our vinyl records and CD covers, which reinterpret Taylor&apos;s eras through vibrant, storytelling visuals that captivate collectors and creative fans alike.
                </p>
                
                <p className="font-medium tracking-tight leading-relaxed text-lg">
                    To make shopping even more personal, we offer matching sets and mood-based bundles grouped by emotions like comfort, empowerment, nostalgia, and heartbreak, reflecting the emotional journey of fandom. Above all, we commit to ethical sourcing, transparency, and community-driven design, ensuring that every product is crafted with care and emotional intelligence to make you feel connected, seen, and part of something bigger.
                </p>
            </div>
        </div>

        {/* Mission, Vision, Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Mission Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-center">
                    <Title className="mb-4 text-2xl">
                        MISSION
                    </Title>
                    <p className="font-medium tracking-tight leading-relaxed text-gray-700">
                        To offer curated Taylor-inspired merch that fans love and connect with.
                    </p>
                </div>
            </div>
            
            {/* Vision Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-center">
                    <Title className="mb-4 text-2xl">
                        VISION
                    </Title>
                    <p className="font-medium tracking-tight leading-relaxed text-gray-700">
                        To be the top merch destination for Swifties looking for meaningful and stylish finds.
                    </p>
                </div>
            </div>

            {/* Values Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-center">
                    <Title className="mb-4 text-2xl">
                        VALUES
                    </Title>
                    <ul className="list-none space-y-2 text-left">
                        <li className="font-medium tracking-tight leading-relaxed">
                            <span className="font-bold text-blue-600 text-xl">S</span>
                            <span className="font-bold">tyle</span>
                        </li>
                        <li className="font-medium tracking-tight leading-relaxed">
                            <span className="font-bold text-blue-600 text-xl">W</span>
                            <span className="font-bold">orth</span>
                        </li>
                        <li className="font-medium tracking-tight leading-relaxed">
                            <span className="font-bold text-blue-600 text-xl">I</span>
                            <span className="font-bold">nnovation</span>
                        </li>
                        <li className="font-medium tracking-tight leading-relaxed">
                            <span className="font-bold text-blue-600 text-xl">F</span>
                            <span className="font-bold">aithfulness</span>
                        </li>
                        <li className="font-medium tracking-tight leading-relaxed">
                            <span className="font-bold text-blue-600 text-xl">T</span>
                            <span className="font-bold">ailored</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
                <Title className="mb-4">
                    VISIT US
                </Title>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="font-medium text-gray-700 text-lg">
                    16 Tandang Sora Ave, Novaliches, Quezon City, 1116 Metro Manila
                </p>
            </div>
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border-4 border-gray-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.2947842857657!2d121.04891207585944!3d14.703129873086537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0f5e6c7e0ab%3A0x7e8c5a1e5e6c7e0a!2s16%20Tandang%20Sora%20Ave%2C%20Quezon%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Taylor Finds Location"
                ></iframe>
            </div>
        </div>
    </Container>
</div>
    );
};

export default AboutPage