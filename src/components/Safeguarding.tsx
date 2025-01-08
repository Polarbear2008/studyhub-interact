export const Safeguarding = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Safeguarding Policy</h1>
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Our Commitment</h2>
          <p>We are committed to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Protecting all users, especially those under 18</li>
            <li>Maintaining a safe online learning environment</li>
            <li>Regular staff training on safeguarding</li>
            <li>Prompt response to concerns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Safety Measures</h2>
          <p>Our safety measures include:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Thorough background checks for tutors</li>
            <li>Monitored communication channels</li>
            <li>Clear reporting procedures</li>
            <li>Regular platform safety reviews</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Reporting Concerns</h2>
          <p>If you have any concerns:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Use the in-platform reporting system</li>
            <li>Contact our safeguarding team directly</li>
            <li>All reports are treated confidentially</li>
            <li>24/7 emergency contact available</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Online Safety Guidelines</h2>
          <p>We recommend:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Using platform communication tools only</li>
            <li>Never sharing personal contact information</li>
            <li>Reporting suspicious behavior immediately</li>
            <li>Following our online safety guidelines</li>
          </ul>
        </section>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="font-semibold text-blue-900">Emergency Contacts:</p>
          <p className="mt-2">Safeguarding Team: +44 (0)1865 306637</p>
          <p>Email: safeguarding@sirmichael.com</p>
          <p className="mt-2 text-sm">For immediate concerns outside of office hours, please contact your local authorities.</p>
        </div>
      </div>
    </div>
  );
};