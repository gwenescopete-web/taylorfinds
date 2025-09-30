import Container from '@/components/Container'
import { SubTitle, Title } from '@/components/ui/text'
import React from 'react'

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
    <Container className="lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
            <Title className="mb-4 text-center">
                TERMS AND CONDITIONS
            </Title>
            <p className="text-center text-gray-600 mb-8">
                Last Updated: September 30, 2025
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        1. Acceptance of Terms
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        By accessing and using Taylor Finds website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        2. Use of Services
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        You agree to use Taylor Finds website only for lawful purposes and in accordance with these Terms and Conditions. You must not use our website in any way that could damage, disable, or impair the site or interfere with any other party&apos;s use of the website.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        3. Intellectual Property
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        All content and materials available on Taylor Finds website are the property of Taylor Finds and are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                    </p>
                </section>
                
                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        4. Limitation of Liability
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        Taylor Finds shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website. We provide our services &quote;as is&quote; without any warranties of any kind.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        5. Changes to Terms
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes by posting a notice on our website. Your continued use of the website after such modifications constitutes your acceptance of the updated terms.
                    </p>
                </section>

                <section className="border-l-4 border-blue-600 pl-6 py-2">
                    <SubTitle className="text-xl font-semibold mb-3 text-gray-900">
                        6. Contact Information
                    </SubTitle>
                    <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
                        If you have any questions about these Terms and Conditions, please contact us at taylorfinds@gmail.com or call us at +63 927 089 5613.
                    </p>
                </section>
            </div>

            <div className="mt-8 text-center text-gray-600 text-sm">
                <p>By using Taylor Finds, you acknowledge that you have read and understood these Terms and Conditions.</p>
            </div>
        </div>
    </Container>
</div>
  )
}

export default TermsPage