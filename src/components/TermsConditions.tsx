export const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Service Terms</h2>
          <p>By accessing our platform, you agree to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Use the service for educational purposes only</li>
            <li>Maintain accurate account information</li>
            <li>Protect your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h2>
          <p>Users must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Respect intellectual property rights</li>
            <li>Maintain appropriate behavior in all interactions</li>
            <li>Report any security concerns promptly</li>
            <li>Not share account access with others</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Payment Terms</h2>
          <p>Our payment terms include:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Clear pricing for all services</li>
            <li>Secure payment processing</li>
            <li>Refund policy for eligible cases</li>
            <li>Subscription terms and conditions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Content Usage</h2>
          <p>Regarding platform content:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>All materials are for personal educational use only</li>
            <li>No redistribution without permission</li>
            <li>Attribution requirements for shared content</li>
            <li>Copyright protection of materials</li>
          </ul>
        </section>
      </div>
    </div>
  );
};