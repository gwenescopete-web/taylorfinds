import Container from '@/components/Container'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqsData } from '@/constants/data'
import React from 'react'

const FAQsPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <Container className="lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
                FREQUENTLY ASKED QUESTIONS
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our products, shipping, and policies.
            </p>
        </div>

        {/* FAQ Accordion Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                {faqsData?.map((faq, index) => (
                    <AccordionItem 
                        key={index} 
                        value={`item-${index}`} 
                        className="border-2 border-gray-200 rounded-lg px-6 py-2 hover:border-blue-400 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                    Still have questions?
                </h3>
                <p className="text-gray-600 mb-4">
                    Can&apos;t find the answer you&apos;re looking for? Feel free to reach out to our support team.
                </p>
                <a 
                    href="/contact" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    Contact Us
                </a>
            </div>
        </div>
    </Container>
</div>
  )
}

export default FAQsPage