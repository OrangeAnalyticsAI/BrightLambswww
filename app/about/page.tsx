import Link from 'next/link';
import { Users, BarChart, Lightbulb, Target, Award, Briefcase } from 'lucide-react';
import Image from 'next/image';

const FeatureCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 py-12 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              About <span className="text-pink-700 dark:text-pink-400">bright</span>{' '}
              <span className="text-orange-500 dark:text-orange-400">lambs</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300">
              Empowering businesses with expert analysis and data-driven insights to drive growth
              and efficiency.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 font-baloo2 text-3xl font-bold text-gray-800 dark:text-white">
                Why we started <span className="text-pink-700 dark:text-pink-400">Bright</span>{' '}
                <span className="text-orange-500 dark:text-orange-400">Lambs</span>
              </h2>
              <div className="mb-8 space-y-4 text-left text-lg text-gray-700 dark:text-gray-300">
                <p className="font-baloo2">
                  <span className="text-pink-700">Bright</span>{' '}
                  <span className="text-orange-500">Lambs</span> was born from experience,
                  frustration - and a shared belief in people.
                </p>

                <p>
                  The three of us, <span className="font-bold">Bex, Jen and Ally</span> all worked
                  at <span className="font-bold">Volta Trucks</span>, an Electric Truck start-up
                  scaling at a breath-taking pace. In that pressure cooker of innovation, where
                  every day brought a new challenge and surprise, we learned something fundamental:
                </p>

                <p className="font-bold">
                  The success of any business, especially a start-up, doesn't come from systems or
                  strategy alone. It comes from learning, understanding and freedom to innovate.
                </p>

                <p>Our mission is rooted in that principle.</p>
                <p>
                  To deeply understand the business need and translate that into clear and
                  purposeful processes and and only then finding the right systems to bring it to
                  life; efficiently, elegantly, and in a way real humans can use. Whilst still using
                  all the latest AI tools and techniques to improve efficiency and quality.
                </p>

                <p>
                  Between us, we built the teams to make that happen. Jen led the business analysis
                  team, Bex developed the product lifecycle management function, and Ally steered
                  programme and project delivery. But what bonded us wasn't our output - it was our
                  values.
                </p>

                <p>
                  We're all deeply passionate about people. About{' '}
                  <span className="font-bold">helping them grow, achieve, and thrive.</span>
                </p>

                <p>
                  And we kept seeing the same thing: business analysts were being left behind.
                  <br />
                  They didn't quite belong to the business, or to IT, or to operations. They sat
                  between the cracks; they were the glue between the cracks of stove-piped
                  departments and functions. Undervalued, unsupported, and too often misunderstood.
                </p>

                <p>But we knew better.</p>

                <p>
                  Because great BAs aren't defined by their tools or templates, they're defined by{' '}
                  <span className="font-bold">empathy, insight, and clarity</span>. Those are human
                  skills. And like all human skills, they need nurturing.
                </p>

                <p className="font-[var(--font-nunito)]">
                  You become one through{' '}
                  <span className="font-bold">mentoring, coaching, leadership, and belief</span>.
                  <br />
                  That's the truth no one talks about - and it's why we created Bright Lambs, to
                  create and empower great Business Analysts that can support your business to do
                  amazing things. It's also why we creating the{' '}
                  <span className="font-bold">Business Analysis Academy</span> to share knowledge
                  and best practice with every BA on the planet, you can join for free at{' '}
                  <a
                    href="https://baa.ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    BAA.ac
                  </a>
                  .
                </p>

                <p className="font-[var(--font-nunito)]">
                  Bright Lambs isn't just a consultancy. It's a commitment:
                </p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    To grow <span className="font-bold">outstanding business analysts,</span>
                  </li>
                  <li>
                    To create <span className="font-bold">high-trust environments,</span>
                  </li>
                  <li>
                    To deliver <span className="font-bold">better business outcomes,</span>
                  </li>
                  <li>
                    By putting <span className="font-bold">people first.</span>
                  </li>
                </ul>

                <p>
                  We're not here to push frameworks or dogma. We're here to build{' '}
                  <span className="font-bold">confidence, capability, and connection</span> because
                  when people flourish, businesses follow.
                </p>
              </div>
              <div className="mx-auto my-12 h-1 w-24 bg-blue-600"></div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
                Our Leadership Team
              </h2>
              <div className="mx-auto mb-6 h-1 w-24 bg-blue-600"></div>
              <p className="mx-auto max-w-3xl text-lg font-[var(--font-nunito)] text-gray-600 dark:text-gray-300">
                Meet the experienced professionals behind Bright Lambs, dedicated to delivering
                exceptional business analysis services.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {/* Bex Smith - CEO */}
              <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl">
                <div className="relative w-full overflow-hidden bg-gray-100 pb-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/team/Bex-hooman.png"
                      alt="Bex Smith - CEO"
                      width={400}
                      height={400}
                      className="max-h-full max-w-full object-contain"
                      style={{ objectPosition: 'top' }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Bex Smith</h3>
                  <p className="mb-4 font-medium text-blue-600">Chief Executive Officer</p>
                  <p className="mb-4 text-gray-600">
                    Bex Smith is a highly accomplished Head of Product Data and former PLM Product
                    Owner at Volta Trucks, known for her expertise in Product Lifecycle Management
                    (PLM) and data strategy within the automotive industry. She spearheaded the
                    implementation of 3DEXPERIENCE as Volta's PLM system, optimizing processes for
                    hundreds of users and building a specialized team in Variant Configuration and
                    Change Control. Previously at Quick Release (Automotive) Ltd, Bex excelled in
                    business unit ownership and project delivery, managing complex client accounts
                    and leading large analytical teams. Her proven ability to streamline operations,
                    deliver critical data solutions, and drive efficiency consistently generates
                    significant value in fast-paced product development environments. Bex is our
                    Chief Executive Officer.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Product Data & Strategy</span>
                  </div>
                </div>
              </div>

              {/* Jen Payne - CTO */}
              <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl">
                <div className="relative w-full overflow-hidden bg-gray-100 pb-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/team/Jen-hooman.png"
                      alt="Jen Payne - CTO"
                      width={400}
                      height={400}
                      className="max-h-full max-w-full object-contain"
                      style={{ objectPosition: 'top' }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Jen Payne</h3>
                  <p className="mb-4 font-medium text-blue-600">Chief Technology Officer</p>
                  <p className="mb-4 text-gray-600">
                    Jen Payne is a Digital Transformation and ERP Implementation specialist,
                    renowned for driving significant operational improvements through systems
                    implementations. Experiences include finance transformation program to Oracle
                    Fusion for Zenith Vehicles, providing crucial C-suite decision support and
                    ensuring seamless system selection and process definition. Her work at Armstrong
                    Fluid Technology further highlights her ability to digitalize critical business
                    functions and optimize processes, consistently delivering tangible results. With
                    a strong background in leading multinational business analyst teams and
                    extensive military leadership, Jen excels at turning complex challenges into
                    streamlined, efficient, and impactful business solutions. Jen is our Chief
                    Technology Officer.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="mr-2 h-4 w-4" />
                    <span>Digital Transformation Expert</span>
                  </div>
                </div>
              </div>

              {/* Ally Huang - COO */}
              <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl">
                <div className="relative w-full overflow-hidden bg-gray-100 pb-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/team/Ally-hooman.png"
                      alt="Ally Huang - COO"
                      width={400}
                      height={400}
                      className="max-h-full max-w-full object-contain"
                      style={{ objectPosition: 'top' }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Ally Huang</h3>
                  <p className="mb-4 font-medium text-blue-600">Chief Operating Officer</p>
                  <p className="mb-4 text-gray-600">
                    Ally Huang is a highly experienced Senior Program Manager with a robust
                    background in the automotive industry, specializing in driving complex product
                    development and strategic initiatives. At Volta Trucks, she lead significant
                    programs, building on her prior role as Lead Engineer in Body Programs. Her
                    extensive tenure at Scania Group, both as a full-time Project Manager and
                    through ALTEN Sweden, saw her responsible for critical projects within Bus
                    Product Engineering, including field quality and product improvement. With a
                    strong foundation in CAE engineering and structural analysis, Ally consistently
                    delivers results by expertly managing projects, optimizing processes, and
                    ensuring successful product realization in demanding engineering environments.
                    Ally is our Chief Operating Officer.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Target className="mr-2 h-4 w-4" />
                    <span>Program Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to work with us?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl">
              Discover how our BAaaS solutions can transform your business operations and drive
              success.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 shadow-lg transition-colors hover:bg-gray-100"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
