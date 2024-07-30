import React from 'react'

export default function TermsCondition() {
    const email = "support@example.com"; 
    return (
        <main>
            <div className='container'>
                <section className="container pt-5 pb-5">
                    <div className="row">
                        <div className="col text-white">
                            <div>
                                <h1 className="mb-4">Terms and Conditions for My Films</h1>
                                <p><strong>Date:</strong> July 27, 2024</p>
                                <h2 className="mt-4">1. Acceptance of Terms</h2>
                                <p>By accessing and using the My Films application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should discontinue use of the application immediately.</p>
                                <h2 className="mt-4">2. Description of Service</h2>
                                <p>My Films allows users to save movie details in favorites or create custom watchlists. The service is provided on an "as-is" basis, and the developers are not liable for any interruptions or inaccuracies.</p>
                                <h2 className="mt-4">3. User Responsibilities</h2>
                                <p><strong>Account Information:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                                <p><strong>Prohibited Conduct:</strong> You agree not to use My Films for any unlawful or prohibited activities. This includes, but is not limited to, engaging in fraud, transmitting viruses, or infringing on any intellectual property rights.</p>
                                <h2 className="mt-4">4. Intellectual Property</h2>
                                <p>All content provided on My Films, including text, graphics, logos, and software, is the property of My Films or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without explicit permission.</p>
                                <h2 className="mt-4">5. Privacy Policy</h2>
                                <p>Your use of My Films is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. By using the service, you agree to the collection and use of information in accordance with the Privacy Policy.</p>
                                <h2 className="mt-4">6. Limitation of Liability</h2>
                                <p>My Films and its developers will not be liable for any damages arising out of or in connection with your use of the application. This includes direct, indirect, incidental, punitive, and consequential damages.</p>
                                <h2 className="mt-4">7. Changes to Terms</h2>
                                <p>My Films reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of the service after any such changes constitutes your acceptance of the new terms.</p>
                                <h2 className="mt-4">8. Governing Law</h2>
                                <p>These terms are governed by and construed in accordance with the laws of the jurisdiction in which My Films operates, without regard to its conflict of law principles.</p>
                                <h2 className="mt-4">9. Contact Information</h2>
                                <p>For any questions or concerns about these Terms and Conditions, please contact us at {email}.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
