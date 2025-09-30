import Container from '@/components/Container'
import { SubTitle, Title } from '@/components/ui/text'
import React from 'react'

const PrivacyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
    <Container className="lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
            <Title className="mb-4 text-center">
                PRIVACY POLICY
            </Title>
            <p className="text-center text-gray-600 mb-8">
                Last Updated: September 30, 2025
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        1. Information Collection
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        We collect personal information from you when you use our website, including your name, email address, and any other information you provide. We use this information to improve our services and communicate with you.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        2. Use of Information
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        We use the information we collect to provide and improve our services, respond to your inquiries, and send you updates about our website. We do not share your personal information with third parties without your consent, except as required by law.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        3. Information Sharing
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential.
                    </p>
                </section>
                
                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        4. Data Security
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        We take data security seriously and implement reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        5. Your Rights
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        You have the right to request access to the personal information we hold about you, to request that we correct any inaccuracies, and to request that we delete your personal information. To exercise these rights, please contact us using the contact information provided below.
                    </p>
                </section>
            </div>

            <div className="mt-8 text-center text-gray-600 text-sm">
                <p>By using Taylor Finds, you acknowledge that you have read and understood these Privacy Policy.</p>
            </div>
        </div>
    </Container>
</div>
  )
}

export default PrivacyPage