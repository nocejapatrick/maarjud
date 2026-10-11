import type { Metadata } from 'next';
import { PrivacyChoice } from '@/components/PrivacyChoice';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What the Maarjud site saves in your browser and what happens to the details you send when you order.',
};

// DRAFT: the first and third sections describe what the site really does. The "When you order" and "Questions"
// sections are placeholders: the shop owner needs to fill them in (and have them checked) before the site goes live.
export default function PrivacyPage() {
  return (
    <article className="prose-page mx-auto max-w-[640px] px-[30px] pb-16 pt-[26px] lg:px-0 lg:pb-24 lg:pt-[41px]">
      <h1 className="font-serif text-[26px] italic leading-none lg:text-[30px]">Privacy</h1>

      <h2>What this site saves in your browser</h2>
      <ul>
        <li>Your bag, so it is still there when you come back. The bag cannot work without this.</li>
        <li>The pieces you have recently looked at, only if you accept.</li>
        <li>Which of the two choices you picked, so we do not ask on every visit.</li>
      </ul>
      <p>All of this stays in your browser. We do not use advertising or tracking cookies.</p>

      <h2>When you order</h2>
      <p>
        You send us your order by message on Instagram and pay through GCash. We see what you send us there, such as
        your name, your order and where to deliver it, and we use it to confirm, pack and deliver your order.
      </p>
      <p>Placeholder: say how long you keep order messages and who else sees the details, for example the courier.</p>

      <h2>Your choice</h2>
      <PrivacyChoice />

      <h2>Questions</h2>
      <p>Placeholder: add who to contact about personal data and how, for example a name and an email address.</p>
    </article>
  );
}
